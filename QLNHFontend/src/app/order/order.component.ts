import { Subscriber } from 'rxjs';
import { Order } from '../models/order.model';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import {MessageService} from 'primeng/api';
import {ConfirmationService}from 'primeng/api';
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit{

    constructor(
      private dataService: DataService,
      private messageService: MessageService, //hien thi thanh cong, khong thanh cong
      private confirmationService: ConfirmationService) { } //confirm xem co muon xoa that hay khong

      public orders:Order[]=[];
      public orderDialog=false; //minh sua thi no hien len, khong thi no giau di
      private newOrder: Order={
        id:0,
        orderNumber:'',
        description:'',
        created: new Date(),
        updated:new Date(),
        deleted:false,
        voided:false,
        totalPrice:0,
        paidAmount:0,
      };

      public order:Order=Object.assign({}, this.newOrder);
      public submitted=true;

      public ngOnInit():void {
        this.loadOrders();
      }

      private loadOrders():void{
        this.dataService.getAllOrders().subscribe((data)=>{
          this.orders=data;
          console.log('Order: ', data);
        });
      }
      public editOrder(order: Order):void {
        console.log('edit order:',order);
        this.order=order;
        this.orderDialog=true;
      }

      public deleteOrder(order: Order):void {
        console.log('delete order:', order);
        this.confirmationService.confirm ({
          message:'Are you sure you want to delete *'+order.orderNumber + '*?',
          header:'Confirm',
          icon: 'pi pi-exclamation-triangle',
          accept:()=>{
            order.deleted=true;
            console.log('xóa: ', order);
            this.dataService.putOrder(order).subscribe((data)=> {
              console.log('xóa xong: ', data);
          });
          },
        });
      }

      public openNew():void {
        console.log('openNew:');
        this.order=Object.assign({}, this.newOrder);
        this.orderDialog=true;
      }

      public hideDialog(cancel=true, success=true):void {
        console.log('hideDialog: ');
        this.orderDialog=false;
        if(cancel) {
          this.messageService.add({
            severity:'info',
            summary:'Hủy',
            detail:'Đổi ý, không muốn thêm nữa',
            life:3000,
          });
        } else if(success) {
          this.messageService.add({
            severity:'success',
            summary:'Thành công',
            detail:'Thêm mới nhà hàng thành công',
            life:3000,
          });
        }
        else {
          this.messageService.add({
            severity:'error',
            summary:'Lỗi',
            detail:'Thêm mới nhà hàng bị lỗi',
            life:3000,
          });
      }
    }
    public saveOrder():void {
      console.log('saveOrder:', this.order);
      if(this.order.id===0) {
        this.dataService.postOrder(this.order).subscribe(
          (data)=>{
          console.log('return data = ', data);
          this.orders.push(data);
          this.hideDialog(false, true);
        },
        (error)=>{
          console.log('error');
          this.hideDialog(false, false);
        }
        );
    } else {
      this.dataService.putOrder(this.order).subscribe(
        (data)=>{
        console.log('return data = ', data);

        this.hideDialog(false, true);
      },
      (error)=>{
        console.log('error');
        this.hideDialog(false, false);
      }
      );
    }
}
}
