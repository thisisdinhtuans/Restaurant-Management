import { Subscriber } from 'rxjs';
import { Guest } from './../models/guest.model';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import {MessageService} from 'primeng/api';
import {ConfirmationService}from 'primeng/api';
@Component({
  selector: 'app-guest',
  templateUrl: './guest.component.html',
  styleUrls: ['./guest.component.scss'],
})
export class GuestComponent implements OnInit{

    constructor(
      private dataService: DataService,
      private messageService: MessageService, //hien thi thanh cong, khong thanh cong
      private confirmationService: ConfirmationService) { } //confirm xem co muon xoa that hay khong

      public guests:Guest[]=[];
      public guestDialog=false; //minh sua thi no hien len, khong thi no giau di
      private newGuest: Guest={
        id:0,
        name:'',
        description:'',
        phone:'',
        created: new Date(),
        updated:new Date(),
        deleted:false,
      };

      public guest:Guest=Object.assign({}, this.newGuest);
      public submitted=true;

      public ngOnInit():void {
        this.loadGuests();
      }

      private loadGuests():void{
        this.dataService.getAllGuests().subscribe((data)=>{
          this.guests=data;
          console.log('Guest: ', data);
        });
      }
      public editGuest(guest: Guest):void {
        console.log('edit guest:',guest);
        this.guest=guest;
        this.guestDialog=true;
      }

      public deleteGuest(guest: Guest):void {
        console.log('delete guest:', guest);
        this.confirmationService.confirm ({
          message:'Are you sure you want to delete *'+guest.name + '*?',
          header:'Confirm',
          icon: 'pi pi-exclamation-triangle',
          accept:()=>{
            guest.deleted=true;
            console.log('xóa: ', guest);
            this.dataService.putGuest(guest).subscribe((data)=> {
              console.log('xóa xong: ', data);
          });
          },
        });
      }

      public openNew():void {
        console.log('openNew:');
        this.guest=Object.assign({}, this.newGuest);
        this.guestDialog=true;
      }

      public hideDialog(cancel=true, success=true):void {
        console.log('hideDialog: ');
        this.guestDialog=false;
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
    public saveGuest():void {
      console.log('saveGuest:', this.guest);
      if(this.guest.id===0) {
        this.dataService.postGuest(this.guest).subscribe(
          (data)=>{
          console.log('return data = ', data);
          this.guests.push(data);
          this.hideDialog(false, true);
        },
        (error)=>{
          console.log('error');
          this.hideDialog(false, false);
        }
        );
    } else {
      this.dataService.putGuest(this.guest).subscribe(
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
