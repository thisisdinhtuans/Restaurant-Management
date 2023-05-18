export interface Put {
  id:number;
  putNumber:string;
  description:string;
  created:Date;
  updated:Date;
  deleted:boolean;
  voided:boolean;
  totalPrice:number;
  paidAmount: number;
  guestId:number;
  // createdUser:User;
  // updatedUser:User;
}
