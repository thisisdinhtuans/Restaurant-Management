import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Restaurant } from './models/restaurant.model';
import { Role } from './models/role.model';
import { environment } from 'src/environments/environment';
import { Status } from './models/status.model';
import { User } from './models/user.model';
import { Guest } from './models/guest.model';
import { Employee } from './models/employee.model';
import { Staff } from './models/staff.model';
import { Order } from './models/order.model';
import { Item } from './models/item.model';
import { Category } from './models/category.model';
import { Put } from './models/put.model';
import { Bill } from './models/bill.model';




@Injectable({
  providedIn: 'root'
})

export class DataService {
  public REST_API_SERVER = 'https://localhost:44371';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      // Authorization: 'my-auth-token'
    }),
  };

  public newRestaurant: Restaurant={
        id:0,
        name:'',
        description:'',
        phone:'',
        address:'',
        created: new Date(),
        updated:new Date(),
        deleted:false,
  };

  public newStatus: Status={
    id: 0,
    name: '',
    description: '',
    created: new Date(),
    updated: new Date(),
    deleted: false,
    guestId:0,
    // restaurant: this.newRestaurant,
  };

  constructor(private httpClient: HttpClient) {}

  public getAllRestaurants(): Observable<Restaurant[]> {
    const url = `${this.REST_API_SERVER}/restaurant`;
    return this.httpClient.get<Restaurant[]>(url, this.httpOptions);
  }

  public postRestaurant(payload:Restaurant): Observable<Restaurant> {
    const url = `${this.REST_API_SERVER}/restaurant`;
    return this.httpClient.post<Restaurant>(url, payload, this.httpOptions);//payload là thêm dữ liệu từ jsonserver
  }

  public putRestaurant(payload:Restaurant): Observable<Restaurant> {
    const url = `${this.REST_API_SERVER}/restaurant`;
    return this.httpClient.put<Restaurant>(url, payload, this.httpOptions);//payload là thêm dữ liệu từ jsonserver
  }

//----------------------------------------------
  public getAllRoles():Observable<Role[]> {
    const url=`${this.REST_API_SERVER}/role`;
    return this.httpClient.get<Role[]>(url, this.httpOptions);
  }

  public postRole(payload:Role): Observable<Role> {
    const url = `${this.REST_API_SERVER}/role`;
    return this.httpClient.post<Role>(url, payload, this.httpOptions);//payload là thêm dữ liệu từ jsonserver
  }

  public putRole(payload:Role): Observable<Role> {
    const url = `${this.REST_API_SERVER}/role`;
    return this.httpClient.put<Role>(url, payload, this.httpOptions);//payload là thêm dữ liệu từ jsonserver
  }
//--------------------------------------------------------------------------------
  public getAllStatuses(): Observable<Status[]> {
    const url = `${this.REST_API_SERVER}/status`;
    return this.httpClient.get<Status[]>(url, this.httpOptions);
  }

  public postStatus(payload:Status): Observable<Status> {
    const url = `${this.REST_API_SERVER}/status`;
    return this.httpClient.post<Status>(url, payload, this.httpOptions);//payload là thêm dữ liệu từ jsonserver
  }

  public putStatus(payload:Status): Observable<Status> {
    const url = `${this.REST_API_SERVER}/status`;
    return this.httpClient.put<Status>(url, payload, this.httpOptions);//payload là thêm dữ liệu từ jsonserver
  }
  //----------------------------------------------------------------------------------------------------

  public getAllUsers(): Observable<User[]> {
    const url = `${this.REST_API_SERVER}/user`;
    return this.httpClient.get<User[]>(url, this.httpOptions);
  }

  public postUser(payload:User): Observable<User> {
    const url = `${this.REST_API_SERVER}/user`;
    return this.httpClient.post<User>(url, payload, this.httpOptions);//payload là thêm dữ liệu từ jsonserver
  }

  public putUser(payload:User): Observable<User> {
    const url = `${this.REST_API_SERVER}/user`;
    return this.httpClient.put<User>(url, payload, this.httpOptions);//payload là thêm dữ liệu từ jsonserver
  }

  //----------------------------------
  public getAllGuests(): Observable<Guest[]> {
    const url = `${this.REST_API_SERVER}/guest`;
    return this.httpClient.get<Guest[]>(url, this.httpOptions);
  }

  public postGuest(payload:Guest): Observable<Guest> {
    const url = `${this.REST_API_SERVER}/guest`;
    return this.httpClient.post<Guest>(url, payload, this.httpOptions);//payload là thêm dữ liệu từ jsonserver
  }

  public putGuest(payload:Guest): Observable<Guest> {
    const url = `${this.REST_API_SERVER}/guest`;
    return this.httpClient.put<Guest>(url, payload, this.httpOptions);//payload là thêm dữ liệu từ jsonserver
  }
  //--------------------------------
  public getAllEmployees(): Observable<Employee[]> {
    const url = `${this.REST_API_SERVER}/employee`;
    return this.httpClient.get<Employee[]>(url, this.httpOptions);
  }

  public postEmployee(payload:Employee): Observable<Employee> {
    const url = `${this.REST_API_SERVER}/employee`;
    return this.httpClient.post<Employee>(url, payload, this.httpOptions);//payload là thêm dữ liệu từ jsonserver
  }

  public putEmployee(payload:Employee): Observable<Employee> {
    const url = `${this.REST_API_SERVER}/employee`;
    return this.httpClient.put<Employee>(url, payload, this.httpOptions);//payload là thêm dữ liệu từ jsonserver
  }
  //-------------------------------------------------
  public getAllStaffs(): Observable<Staff[]> {
    const url = `${this.REST_API_SERVER}/staff`;
    return this.httpClient.get<Staff[]>(url, this.httpOptions);
  }

  public postStaff(payload:Staff): Observable<Staff> {
    const url = `${this.REST_API_SERVER}/staff`;
    return this.httpClient.post<Staff>(url, payload, this.httpOptions);//payload là thêm dữ liệu từ jsonserver
  }

  public putStaff(payload:Staff): Observable<Staff> {
    const url = `${this.REST_API_SERVER}/staff`;
    return this.httpClient.put<Staff>(url, payload, this.httpOptions);//payload là thêm dữ liệu từ jsonserver
  }
  //--------------------------------------------------------
  public getAllOrders(): Observable<Order[]> {
    const url = `${this.REST_API_SERVER}/order`;
    return this.httpClient.get<Order[]>(url, this.httpOptions);
  }

  public postOrder(payload:Order): Observable<Order> {
    const url = `${this.REST_API_SERVER}/order`;
    return this.httpClient.post<Order>(url, payload, this.httpOptions);//payload là thêm dữ liệu từ jsonserver
  }

  public putOrder(payload:Order): Observable<Order> {
    const url = `${this.REST_API_SERVER}/order`;
    return this.httpClient.put<Order>(url, payload, this.httpOptions);//payload là thêm dữ liệu từ jsonserver
  }
  //------------------------------------------------------
  public getAllItems(): Observable<Item[]> {
    const url = `${this.REST_API_SERVER}/item`;
    return this.httpClient.get<Item[]>(url, this.httpOptions);
  }

  public postItem(payload:Item): Observable<Item> {
    const url = `${this.REST_API_SERVER}/item`;
    return this.httpClient.post<Item>(url, payload, this.httpOptions);//payload là thêm dữ liệu từ jsonserver
  }

  public putItem(payload:Item): Observable<Item> {
    const url = `${this.REST_API_SERVER}/item`;
    return this.httpClient.put<Item>(url, payload, this.httpOptions);//payload là thêm dữ liệu từ jsonserver
  }
  //-----------------------------------------------
  public getAllCategories(): Observable<Category[]> {
    const url = `${this.REST_API_SERVER}/category`;
    return this.httpClient.get<Category[]>(url, this.httpOptions);
  }

  public postCategory(payload:Category): Observable<Category> {
    const url = `${this.REST_API_SERVER}/category`;
    return this.httpClient.post<Category>(url, payload, this.httpOptions);//payload là thêm dữ liệu từ jsonserver
  }

  public putCategory(payload:Category): Observable<Category> {
    const url = `${this.REST_API_SERVER}/category`;
    return this.httpClient.put<Category>(url, payload, this.httpOptions);//payload là thêm dữ liệu từ jsonserver
  }
  //-------------------------------------------------------------------------------------------
  public getAllPuts(): Observable<Put[]> {
    const url = `${this.REST_API_SERVER}/put`;
    return this.httpClient.get<Put[]>(url, this.httpOptions);
  }

  public postPut(payload:Put): Observable<Put> {
    const url = `${this.REST_API_SERVER}/put`;
    return this.httpClient.post<Put>(url, payload, this.httpOptions);//payload là thêm dữ liệu từ jsonserver
  }

  public putPut(payload:Put): Observable<Put> {
    const url = `${this.REST_API_SERVER}/put`;
    return this.httpClient.put<Put>(url, payload, this.httpOptions);//payload là thêm dữ liệu từ jsonserver
  }

//----------------------------------------------
  public getAllBills(): Observable<Bill[]> {
    const url = `${this.REST_API_SERVER}/bill`;
    return this.httpClient.get<Bill[]>(url, this.httpOptions);
  }

  public postBill(payload:Bill): Observable<Bill> {
    const url = `${this.REST_API_SERVER}/bill`;
    return this.httpClient.post<Bill>(url, payload, this.httpOptions);//payload là thêm dữ liệu từ jsonserver
  }

  public putBill(payload:Bill): Observable<Bill> {
    const url = `${this.REST_API_SERVER}/bill`;
    return this.httpClient.put<Bill>(url, payload, this.httpOptions);//payload là thêm dữ liệu từ jsonserver
  }

}
//----------------------------------------------
