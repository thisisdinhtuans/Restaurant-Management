import { Subscriber } from 'rxjs';
import { Category } from './../models/category.model';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import {MessageService} from 'primeng/api';
import {ConfirmationService}from 'primeng/api';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit{

    constructor(
      private dataService: DataService,
      private messageService: MessageService, //hien thi thanh cong, khong thanh cong
      private confirmationService: ConfirmationService) { } //confirm xem co muon xoa that hay khong

      public categories:Category[]=[];
      public categoryDialog=false; //minh sua thi no hien len, khong thi no giau di
      private newCategory: Category={
        id:0,
        name:'',
        description:'',
        created: new Date(),
        updated:new Date(),
        deleted:false,
      };

      public category:Category=Object.assign({}, this.newCategory);
      public submitted=true;

      public ngOnInit():void {
        this.loadCategories();
      }

      private loadCategories():void{
        this.dataService.getAllCategories().subscribe((data)=>{
          this.categories=data;
          console.log('Category: ', data);
        });
      }
      public editCategory(category: Category):void {
        console.log('edit category:',category);
        this.category=category;
        this.categoryDialog=true;
      }

      public deleteCategory(category: Category):void {
        console.log('delete category:', category);
        this.confirmationService.confirm ({
          message:'Are you sure you want to delete *'+category.name + '*?',
          header:'Confirm',
          icon: 'pi pi-exclamation-triangle',
          accept:()=>{
            category.deleted=true;
            console.log('xóa: ', category);
            this.dataService.putCategory(category).subscribe((data)=> {
              console.log('xóa xong: ', data);
          });
          },
        });
      }

      public openNew():void {
        console.log('openNew:');
        this.category=Object.assign({}, this.newCategory);
        this.categoryDialog=true;
      }

      public hideDialog(cancel=true, success=true):void {
        console.log('hideDialog: ');
        this.categoryDialog=false;
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
    public saveCategory():void {
      console.log('saveCategory:', this.category);
      if(this.category.id===0) {
        this.dataService.postCategory(this.category).subscribe(
          (data)=>{
          console.log('return data = ', data);
          this.categories.push(data);
          this.hideDialog(false, true);
        },
        (error)=>{
          console.log('error');
          this.hideDialog(false, false);
        }
        );
    } else {
      this.dataService.putCategory(this.category).subscribe(
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
