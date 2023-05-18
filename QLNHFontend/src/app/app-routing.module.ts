
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { RoleComponent } from './role/role.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { StatusComponent } from './status/status.component';
import { UserComponent } from './user/user.component';
import { GuestComponent } from './guest/guest.component';
import { StaffComponent } from './staff/staff.component';
import { OrderComponent } from './order/order.component';
import { ItemComponent } from './item/item.component';
import { CategoryComponent } from './category/category.component';
import { PutComponent } from './put/put.component';
import { BillComponent } from './bill/bill.component';


const routes: Routes = [
  {path: 'restaurant',component:RestaurantComponent},
  {path: 'role',component:RoleComponent},
  {path: 'status',component:StatusComponent},
  {path: 'user',component:UserComponent},
  {path: 'guest',component:GuestComponent},
  {path: 'put',component:PutComponent},
  {path: 'bill',component:BillComponent},

  {path: 'staff',component:StaffComponent},
  {path: 'order',component:OrderComponent},
  {path: 'item',component:ItemComponent},
  {path: 'category',component:CategoryComponent},

  {path: '',component:HomeComponent},
  {path: '**',component:PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
