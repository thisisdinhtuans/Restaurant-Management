import { Subscriber } from 'rxjs';
import { Status } from './../models/status.model';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import {MessageService} from 'primeng/api';
import {ConfirmationService}from 'primeng/api';
@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss'],
})
export class StatusComponent implements OnInit{

    constructor(
      private dataService: DataService,
      private messageService: MessageService, //hien thi thanh cong, khong thanh cong
      private confirmationService: ConfirmationService) { } //confirm xem co muon xoa that hay khong

      public statuses:Status[]=[];
      public statusDialog=false; //minh sua thi no hien len, khong thi no giau di
      private newStatus: Status={
        id:0,
        name:'',
        description:'',
        created: new Date(),
        updated:new Date(),
        deleted:false,
        guestId:0,
      };

      public status:Status=Object.assign({}, this.newStatus);
      public submitted=true;

      public ngOnInit():void {
        this.loadStatuses();
      }

      private loadStatuses():void{
        this.dataService.getAllStatuses().subscribe((data)=>{
          this.statuses=data;
          console.log('Status: ', data);
        });
      }
      public editStatus(status: Status):void {
        console.log('edit status:',status);
        this.status=status;
        this.statusDialog=true;
      }

      public deleteStatus(status: Status):void {
        console.log('delete status:', status);
        this.confirmationService.confirm ({
          message:'Are you sure you want to delete *'+status.name + '*?',
          header:'Confirm',
          icon: 'pi pi-exclamation-triangle',
          accept:()=>{
            status.deleted=true;
            console.log('xóa: ', status);
            this.dataService.putStatus(status).subscribe((data)=> {
              console.log('xóa xong: ', data);
          });
          },
        });
      }

      public openNew():void {
        console.log('openNew:');
        this.status=Object.assign({}, this.newStatus);
        this.statusDialog=true;
      }

      public hideDialog(cancel=true, success=true):void {
        console.log('hideDialog: ');
        this.statusDialog=false;
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
    public saveStatus():void {
      console.log('saveStatus:', this.status);
      if(this.status.id===0) {
        this.dataService.postStatus(this.status).subscribe(
          (data)=>{
          console.log('return data = ', data);
          this.statuses.push(data);
          this.hideDialog(false, true);
        },
        (error)=>{
          console.log('error');
          this.hideDialog(false, false);
        }
        );
    } else {
      this.dataService.putStatus(this.status).subscribe(
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
