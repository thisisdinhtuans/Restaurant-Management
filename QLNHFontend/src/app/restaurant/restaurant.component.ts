import { Subscriber } from 'rxjs';
import { Restaurant } from './../models/restaurant.model';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import {MessageService} from 'primeng/api';
import {ConfirmationService}from 'primeng/api';
@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss'],
})
export class RestaurantComponent implements OnInit{

    constructor(
      private dataService: DataService,
      private messageService: MessageService, //hien thi thanh cong, khong thanh cong
      private confirmationService: ConfirmationService) { } //confirm xem co muon xoa that hay khong

      public restaurants:Restaurant[]=[];
      public restaurantDialog=false; //minh sua thi no hien len, khong thi no giau di
      private newRestaurant: Restaurant={
        id:0,
        name:'',
        description:'',
        phone:'',
        address:'',
        created: new Date(),
        updated:new Date(),
        deleted:false,
      };

      public restaurant:Restaurant=Object.assign({}, this.newRestaurant);
      public submitted=true;

      public ngOnInit():void {
        this.loadRestaurants();
      }

      private loadRestaurants():void{
        this.dataService.getAllRestaurants().subscribe((data)=>{
          this.restaurants=data;
          console.log('Restaurant: ', data);
        });
      }
      public editRestaurant(restaurant: Restaurant):void {
        console.log('edit restaurant:',restaurant);
        this.restaurant=restaurant;
        this.restaurantDialog=true;
      }

      public deleteRestaurant(restaurant: Restaurant):void {
        console.log('delete restaurant:', restaurant);
        this.confirmationService.confirm ({
          message:'Are you sure you want to delete *'+restaurant.name + '*?',
          header:'Confirm',
          icon: 'pi pi-exclamation-triangle',
          accept:()=>{
            restaurant.deleted=true;
            console.log('xóa: ', restaurant);
            this.dataService.putRestaurant(restaurant).subscribe((data)=> {
              console.log('xóa xong: ', data);
          });
          },
        });
      }

      public openNew():void {
        console.log('openNew:');
        this.restaurant=Object.assign({}, this.newRestaurant);
        this.restaurantDialog=true;
      }

      public hideDialog(cancel=true, success=true):void {
        console.log('hideDialog: ');
        this.restaurantDialog=false;
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
    public saveRestaurant():void {
      console.log('saveRestaurant:', this.restaurant);
      if(this.restaurant.id===0) {
        this.dataService.postRestaurant(this.restaurant).subscribe(
          (data)=>{
          console.log('return data = ', data);
          this.restaurants.push(data);
          this.hideDialog(false, true);
        },
        (error)=>{
          console.log('error');
          this.hideDialog(false, false);
        }
        );
    } else {
      this.dataService.putRestaurant(this.restaurant).subscribe(
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
