import { Subscriber } from 'rxjs';
import { Employee } from './../models/employee.model';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import {MessageService} from 'primeng/api';
import {ConfirmationService}from 'primeng/api';
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
})
export class EmployeeComponent implements OnInit{

    constructor(
      private dataService: DataService,
      private messageService: MessageService, //hien thi thanh cong, khong thanh cong
      private confirmationService: ConfirmationService) { } //confirm xem co muon xoa that hay khong

      public employees:Employee[]=[];
      public employeeDialog=false; //minh sua thi no hien len, khong thi no giau di
      private newEmployee: Employee={
        id:0,
        name:'',
        password:'',
        description:'',
        created: new Date(),
        updated:new Date(),
        deleted:false,
        rolid:'',
      };

      public employee:Employee=Object.assign({}, this.newEmployee);
      public submitted=true;

      public ngOnInit():void {
        this.loadEmployees();
      }

      private loadEmployees():void{
        this.dataService.getAllEmployees().subscribe((data)=>{
          this.employees=data;
          console.log('Employee: ', data);
        });
      }
      public editEmployee(employee: Employee):void {
        console.log('edit employee:',employee);
        this.employee=employee;
        this.employeeDialog=true;
      }

      public deleteEmployee(employee: Employee):void {
        console.log('delete employee:', employee);
        this.confirmationService.confirm ({
          message:'Are you sure you want to delete *'+employee.name + '*?',
          header:'Confirm',
          icon: 'pi pi-exclamation-triangle',
          accept:()=>{
            employee.deleted=true;
            console.log('xóa: ', employee);
            this.dataService.putEmployee(employee).subscribe((data)=> {
              console.log('xóa xong: ', data);
          });
          },
        });
      }

      public openNew():void {
        console.log('openNew:');
        this.employee=Object.assign({}, this.newEmployee);
        this.employeeDialog=true;
      }

      public hideDialog(cancel=true, success=true):void {
        console.log('hideDialog: ');
        this.employeeDialog=false;
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
    public saveEmployee():void {
      console.log('saveEmployee:', this.employee);
      if(this.employee.id===0) {
        this.dataService.postEmployee(this.employee).subscribe(
          (data)=>{
          console.log('return data = ', data);
          this.employees.push(data);
          this.hideDialog(false, true);
        },
        (error)=>{
          console.log('error');
          this.hideDialog(false, false);
        }
        );
    } else {
      this.dataService.putEmployee(this.employee).subscribe(
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
