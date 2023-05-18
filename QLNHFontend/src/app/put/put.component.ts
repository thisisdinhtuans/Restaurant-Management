import { Subscriber } from 'rxjs';
import { Put } from '../models/put.model';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import {MessageService} from 'primeng/api';
import {ConfirmationService}from 'primeng/api';
@Component({
  selector: 'app-put',
  templateUrl: './put.component.html',
  styleUrls: ['./put.component.scss'],
})
export class PutComponent implements OnInit{

    constructor(
      private dataService: DataService,
      private messageService: MessageService, //hien thi thanh cong, khong thanh cong
      private confirmationService: ConfirmationService) { } //confirm xem co muon xoa that hay khong

      public puts:Put[]=[];
      public putDialog=false; //minh sua thi no hien len, khong thi no giau di
      private newPut: Put={
        id:0,
        putNumber:'',
        description:'',
        created: new Date(),
        updated:new Date(),
        deleted:false,
        voided:true,
        totalPrice:0,
        paidAmount:0,
        guestId:0,
      };

      public put:Put=Object.assign({}, this.newPut);
      public submitted=true;

      public ngOnInit():void {
        this.loadPuts();
      }

      private loadPuts():void{
        this.dataService.getAllPuts().subscribe((data)=>{
          this.puts=data;
          console.log('Put: ', data);
        });
      }
      public editPut(put: Put):void {
        console.log('edit put:',put);
        this.put=put;
        this.putDialog=true;
      }

      public deletePut(put: Put):void {
        console.log('delete put:', put);
        this.confirmationService.confirm ({
          message:'Are you sure you want to delete *'+put.putNumber + '*?',
          header:'Confirm',
          icon: 'pi pi-exclamation-triangle',
          accept:()=>{
            put.deleted=true;
            console.log('xóa: ', put);
            this.dataService.putPut(put).subscribe((data)=> {
              console.log('xóa xong: ', data);
          });
          },
        });
      }

      public openNew():void {
        console.log('openNew:');
        this.put=Object.assign({}, this.newPut);
        this.putDialog=true;
      }

      public hideDialog(cancel=true, success=true):void {
        console.log('hideDialog: ');
        this.putDialog=false;
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
    public savePut():void {
      console.log('savePut:', this.put);
      if(this.put.id===0) {
        this.dataService.postPut(this.put).subscribe(
          (data)=>{
          console.log('return data = ', data);
          this.puts.push(data);
          this.hideDialog(false, true);
        },
        (error)=>{
          console.log('error');
          this.hideDialog(false, false);
        }
        );
    } else {
      this.dataService.putPut(this.put).subscribe(
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
