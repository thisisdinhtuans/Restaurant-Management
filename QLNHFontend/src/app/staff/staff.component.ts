import { Subscriber } from 'rxjs';
import { Staff } from './../models/staff.model';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import {MessageService} from 'primeng/api';
import {ConfirmationService}from 'primeng/api';
@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss'],
})
export class StaffComponent implements OnInit{

    constructor(
      private dataService: DataService,
      private messageService: MessageService, //hien thi thanh cong, khong thanh cong
      private confirmationService: ConfirmationService) { } //confirm xem co muon xoa that hay khong

      public staffs:Staff[]=[];
      public staffDialog=false; //minh sua thi no hien len, khong thi no giau di
      private newStaff: Staff={
        id:0,
        name:'',
        password:'',
        description:'',
        created: new Date(),
        updated:new Date(),
        deleted:false,
        roleId:'',
      };

      public staff:Staff=Object.assign({}, this.newStaff);
      public submitted=true;

      public ngOnInit():void {
        this.loadStaffs();
      }

      private loadStaffs():void{
        this.dataService.getAllStaffs().subscribe((data)=>{
          this.staffs=data;
          console.log('Staff: ', data);
        });
      }
      public editStaff(staff: Staff):void {
        console.log('edit staff:',staff);
        this.staff=staff;
        this.staffDialog=true;
      }

      public deleteStaff(staff: Staff):void {
        console.log('delete staff:', staff);
        this.confirmationService.confirm ({
          message:'Are you sure you want to delete *'+staff.name + '*?',
          header:'Confirm',
          icon: 'pi pi-exclamation-triangle',
          accept:()=>{
            staff.deleted=true;
            console.log('xóa: ', staff);
            this.dataService.putStaff(staff).subscribe((data)=> {
              console.log('xóa xong: ', data);
          });
          },
        });
      }

      public openNew():void {
        console.log('openNew:');
        this.staff=Object.assign({}, this.newStaff);
        this.staffDialog=true;
      }

      public hideDialog(cancel=true, success=true):void {
        console.log('hideDialog: ');
        this.staffDialog=false;
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
    public saveStaff():void {
      console.log('saveStaff:', this.staff);
      if(this.staff.id===0) {
        this.dataService.postStaff(this.staff).subscribe(
          (data)=>{
          console.log('return data = ', data);
          this.staffs.push(data);
          this.hideDialog(false, true);
        },
        (error)=>{
          console.log('error');
          this.hideDialog(false, false);
        }
        );
    } else {
      this.dataService.putStaff(this.staff).subscribe(
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
