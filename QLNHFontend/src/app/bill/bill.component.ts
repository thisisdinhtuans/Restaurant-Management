import { Subscriber } from 'rxjs';

import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import {MessageService} from 'primeng/api';
import {ConfirmationService}from 'primeng/api';
import { Bill } from '../models/bill.model';
@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.scss'],
})
export class BillComponent implements OnInit{

    constructor(
      private dataService: DataService,
      private messageService: MessageService, //hien thi thanh cong, khong thanh cong
      private confirmationService: ConfirmationService) { } //confirm xem co muon xoa that hay khong

      public bills:Bill[]=[];
      public billDialog=false; //minh sua thi no hien len, khong thi no giau di
      private newBill: Bill={
        id:0,
        itemId:0,
        putId:0,
        quantity:0,
        created: new Date(),
        updated:new Date(),
        deleted:false,
      };

      public bill:Bill=Object.assign({}, this.newBill);
      public submitted=true;

      public ngOnInit():void {
        this.loadBills();
      }

      private loadBills():void{
        this.dataService.getAllBills().subscribe((data)=>{
          this.bills=data;
          console.log('Bill: ', data);
        });
      }
      public editBill(bill: Bill):void {
        console.log('edit bill:',bill);
        this.bill=bill;
        this.billDialog=true;
      }

      public deleteBill(bill: Bill):void {
        console.log('delete bill:', bill);
        this.confirmationService.confirm ({
          message:'Are you sure you want to delete *'+bill.id + '*?',
          header:'Confirm',
          icon: 'pi pi-exclamation-triangle',
          accept:()=>{
            bill.deleted=true;
            console.log('xóa: ', bill);
            this.dataService.putBill(bill).subscribe((data)=> {
              console.log('xóa xong: ', data);
          });
          },
        });
      }

      public openNew():void {
        console.log('openNew:');
        this.bill=Object.assign({}, this.newBill);
        this.billDialog=true;
      }

      public hideDialog(cancel=true, success=true):void {
        console.log('hideDialog: ');
        this.billDialog=false;
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
    public saveBill():void {
      console.log('saveBill:', this.bill);
      if(this.bill.id===0) {
        this.dataService.postBill(this.bill).subscribe(
          (data)=>{
          console.log('return data = ', data);
          this.bills.push(data);
          this.hideDialog(false, true);
        },
        (error)=>{
          console.log('error');
          this.hideDialog(false, false);
        }
        );
    } else {
      this.dataService.putBill(this.bill).subscribe(
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
