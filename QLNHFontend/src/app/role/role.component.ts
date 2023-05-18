import { Subscriber } from 'rxjs';
import { Role } from './../models/role.model';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import {MessageService} from 'primeng/api';
import {ConfirmationService}from 'primeng/api';
@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss'],
})
export class RoleComponent implements OnInit{

    constructor(
      private dataService: DataService,
      private messageService: MessageService, //hien thi thanh cong, khong thanh cong
      private confirmationService: ConfirmationService) { } //confirm xem co muon xoa that hay khong

      public roles:Role[]=[];
      public roleDialog=false; //minh sua thi no hien len, khong thi no giau di
      private newRole: Role={
        id:0,
        name:'',
        description:'',
        created: new Date(),
        updated:new Date(),
        deleted:false,
      };

      public role:Role=Object.assign({}, this.newRole);
      public submitted=true;

      public ngOnInit():void {
        this.loadRoles();
      }

      private loadRoles():void{
        this.dataService.getAllRoles().subscribe((data)=>{
          this.roles=data;
          console.log('Role: ', data);
        });
      }
      public editRole(role: Role):void {
        console.log('edit role:',role);
        this.role=role;
        this.roleDialog=true;
      }

      public deleteRole(role: Role):void {
        console.log('delete role:', role);
        this.confirmationService.confirm ({
          message:'Are you sure you want to delete *'+role.name + '*?',
          header:'Confirm',
          icon: 'pi pi-exclamation-triangle',
          accept:()=>{
            role.deleted=true;
            console.log('xóa: ', role);
            this.dataService.putRole(role).subscribe((data)=> {
              console.log('xóa xong: ', data);
          });
          },
        });
      }

      public openNew():void {
        console.log('openNew:');
        this.role=Object.assign({}, this.newRole);
        this.roleDialog=true;
      }

      public hideDialog(cancel=true, success=true):void {
        console.log('hideDialog: ');
        this.roleDialog=false;
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
    public saveRole():void {
      console.log('saveRole:', this.role);
      if(this.role.id===0) {
        this.dataService.postRole(this.role).subscribe(
          (data)=>{
          console.log('return data = ', data);
          this.roles.push(data);
          this.hideDialog(false, true);
        },
        (error)=>{
          console.log('error');
          this.hideDialog(false, false);
        }
        );
    } else {
      this.dataService.putRole(this.role).subscribe(
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
