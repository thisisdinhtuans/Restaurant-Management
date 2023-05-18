import { InputTextareaModule } from 'primeng/inputtextarea';
import { HttpClientModule } from '@angular/common/http';
import { SplitterModule } from 'primeng/splitter';
import { MenubarModule } from 'primeng/menubar';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {CheckboxModule} from 'primeng/checkbox';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ToastModule} from 'primeng/toast';
import {PanelModule} from 'primeng/panel';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {InputTextModule} from 'primeng/inputtext';
import {ToolbarModule} from 'primeng/toolbar';
import {TableModule} from 'primeng/table';
import {FormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';
import {CalendarModule} from 'primeng/calendar';
import {SliderModule} from 'primeng/slider';
import {MultiSelectModule} from 'primeng/multiselect';
import {ContextMenuModule} from 'primeng/contextmenu';
import {DialogModule} from 'primeng/dialog';
import {DropdownModule} from 'primeng/dropdown';
import {ProgressBarModule} from 'primeng/progressbar';
import {FileUploadModule} from 'primeng/fileupload';
import {RatingModule} from 'primeng/rating';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';


import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { RoleComponent } from './role/role.component';
import {RadioButtonModule} from 'primeng/radiobutton';
import {InputNumberModule} from 'primeng/inputnumber';
import { StatusComponent } from './status/status.component';
import { UserComponent } from './user/user.component';
import { GuestComponent } from './guest/guest.component';
import { StaffComponent } from './staff/staff.component';
import { OrderComponent } from './order/order.component';
import { ItemComponent } from './item/item.component';
import { CategoryComponent } from './category/category.component';
import { PutComponent } from './put/put.component';
import { BillComponent } from './bill/bill.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundComponent,
    RestaurantComponent,
    RoleComponent,
    StatusComponent,
    UserComponent,
    GuestComponent,
    StaffComponent,
    OrderComponent,
    ItemComponent,
    CategoryComponent,
    PutComponent,
    BillComponent,
  ],
  imports: [
    BrowserModule,
    ToastModule,
    AppRoutingModule,
    ButtonModule,
    CardModule,
    MenubarModule,
    SplitterModule,
    HttpClientModule,
    InputTextareaModule,
    RadioButtonModule,
    CheckboxModule,
    PanelModule,
    InputNumberModule,
    ConfirmDialogModule,
    MessagesModule,
    MessageModule,
    InputTextModule,
    ToolbarModule,
    TableModule,
    FormsModule,
    BrowserAnimationsModule,
    RouterModule,
    CalendarModule,
    SliderModule,
    MultiSelectModule,
    ContextMenuModule,
    DialogModule,
    DropdownModule,
    ProgressBarModule,
    FileUploadModule,
    RatingModule,

  ],

  providers: [ConfirmationService,MessageService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
