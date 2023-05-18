export interface Order {
  id:number;
  orderNumber:string;
  description:string;
  created:Date;
  updated:Date;
  deleted:boolean;
  voided:boolean;
  totalPrice:number;
  paidAmount: number;
  // createdUser:User;
  // updatedUser:User;
}
