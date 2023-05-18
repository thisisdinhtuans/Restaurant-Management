
import { Subscriber } from 'rxjs';
import { User } from './../models/user.model';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import {MessageService} from 'primeng/api';
import {ConfirmationService}from 'primeng/api';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit{

    constructor(
      private dataService: DataService,
      private messageService: MessageService, //hien thi thanh cong, khong thanh cong
      private confirmationService: ConfirmationService) { } //confirm xem co muon xoa that hay khong

      public users:User[]=[];
      public userDialog=false; //minh sua thi no hien len, khong thi no giau di
      private newUser: User={
        id:0,
        name:'',
        password:'',
        description:'',
        created: new Date(),
        updated:new Date(),
        deleted:false,
      };

      public user:User=Object.assign({}, this.newUser);
      public submitted=true;

      public ngOnInit():void {
        this.loadUsers();
      }

      private loadUsers():void{
        this.dataService.getAllUsers().subscribe((data)=>{
          this.users=data;
          console.log('User: ', data);
        });
      }
      public editUser(user: User):void {
        console.log('edit user:',user);
        this.user=user;
        this.userDialog=true;
      }

      public deleteUser(user: User):void {
        console.log('delete user:', user);
        this.confirmationService.confirm ({
          message:'Are you sure you want to delete *'+user.name + '*?',
          header:'Confirm',
          icon: 'pi pi-exclamation-triangle',
          accept:()=>{
            user.deleted=true;
            console.log('xóa: ', user);
            this.dataService.putUser(user).subscribe((data)=> {
              console.log('xóa xong: ', data);
          });
          },
        });
      }

      public openNew():void {
        console.log('openNew:');
        this.user=Object.assign({}, this.newUser);
        this.userDialog=true;
      }

      public hideDialog(cancel=true, success=true):void {
        console.log('hideDialog: ');
        this.userDialog=false;
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
    public saveUser():void {
      console.log('saveUser:', this.user);
      if(this.user.id===0) {
        this.dataService.postUser(this.user).subscribe(
          (data)=>{
          console.log('return data = ', data);
          this.users.push(data);
          this.hideDialog(false, true);
        },
        (error)=>{
          console.log('error');
          this.hideDialog(false, false);
        }
        );
    } else {
      this.dataService.putUser(this.user).subscribe(
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
