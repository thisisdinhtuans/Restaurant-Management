export interface Bill {
  id:number;
  itemId:number;
  putId:number;
  quantity:number;
  created:Date;
  updated:Date;
  deleted:boolean;
  // createdUser:User;
  // updatedUser:User;
}
