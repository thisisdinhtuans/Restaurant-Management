import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {MenuItem} from 'primeng/api';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  items: MenuItem[]=[];
  //public note="toi di code";
  //public counter=0;
  title='Quan ly nha hang';
  constructor(private route:ActivatedRoute, private router: Router) {

  }
    ngOnInit():void {
      this.items = [
        {
          label: 'Nhân Viên',
          icon: 'pi pi-fw pi-plus',
          command: () =>this.router.navigate(['/staff']),
        },
        {
          label: 'Chức vụ',
          icon: 'pi pi-fw pi-plus',
          command: () =>this.router.navigate(['/role']),
        },
        {
          label: 'Tinh Trạng',
          icon: 'pi pi-fw pi-plus',
          command: () =>this.router.navigate(['/status']),
        },
        {
          label: 'Khách Hàng',
          icon: 'pi pi-fw pi-plus',
          command: () =>this.router.navigate(['/guest']),

        },
        {
          label: 'Đặt bàn',
          icon: 'pi pi-fw pi-plus',
          command: () =>this.router.navigate(['/put']),

        },
        {
          label: 'Chi tiết Hóa đơn',
          icon: 'pi pi-fw pi-plus',
          command: () =>this.router.navigate(['/bill']),

        },
        {
          label: 'Các loại món ăn',
          icon: 'pi pi-fw pi-plus',
          command: () =>this.router.navigate(['/category']),
        },
        {
          label: 'Món ăn',
          icon: 'pi pi-fw pi-plus',
          command: () =>this.router.navigate(['/item']),

        },
    ];
  }
}
