import { Subscriber } from 'rxjs';
import { Item } from './../models/item.model';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import {MessageService} from 'primeng/api';
import {ConfirmationService}from 'primeng/api';
@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent implements OnInit{

    constructor(
      private dataService: DataService,
      private messageService: MessageService, //hien thi thanh cong, khong thanh cong
      private confirmationService: ConfirmationService) { } //confirm xem co muon xoa that hay khong

      public items:Item[]=[];
      public itemDialog=false; //minh sua thi no hien len, khong thi no giau di
      private newItem: Item={
        id:0,
        name:'',
        description:'',
        price:0,
        discount:0,
        quantity:0,
        created: new Date(),
        updated:new Date(),
        deleted:false,
        categoryId:0,
      };

      public item:Item=Object.assign({}, this.newItem);
      public submitted=true;

      public ngOnInit():void {
        this.loadItems();
      }

      private loadItems():void{
        this.dataService.getAllItems().subscribe((data)=>{
          this.items=data;
          console.log('Item: ', data);
        });
      }
      public editItem(item: Item):void {
        console.log('edit item:',item);
        this.item=item;
        this.itemDialog=true;
      }

      public deleteItem(item: Item):void {
        console.log('delete item:', item);
        this.confirmationService.confirm ({
          message:'Are you sure you want to delete *'+item.name + '*?',
          header:'Confirm',
          icon: 'pi pi-exclamation-triangle',
          accept:()=>{
            item.deleted=true;
            console.log('xóa: ', item);
            this.dataService.putItem(item).subscribe((data)=> {
              console.log('xóa xong: ', data);
          });
          },
        });
      }

      public openNew():void {
        console.log('openNew:');
        this.item=Object.assign({}, this.newItem);
        this.itemDialog=true;
      }

      public hideDialog(cancel=true, success=true):void {
        console.log('hideDialog: ');
        this.itemDialog=false;
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
    public saveItem():void {
      console.log('saveItem:', this.item);
      if(this.item.id===0) {
        this.dataService.postItem(this.item).subscribe(
          (data)=>{
          console.log('return data = ', data);
          this.items.push(data);
          this.hideDialog(false, true);
        },
        (error)=>{
          console.log('error');
          this.hideDialog(false, false);
        }
        );
    } else {
      this.dataService.putItem(this.item).subscribe(
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
