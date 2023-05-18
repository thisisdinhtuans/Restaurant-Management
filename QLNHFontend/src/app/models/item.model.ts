export interface Item {
  id:number;
  name:string;
  description:string;
  price:number;
  discount:number;
  quantity:number;
  created:Date;
  updated:Date;
  deleted:boolean;
  categoryId: number;
  // createdUser:User;
  // updatedUser:User;
}
