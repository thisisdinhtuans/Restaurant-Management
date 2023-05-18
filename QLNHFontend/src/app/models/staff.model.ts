export interface Staff {
  id:number;
  name:string;
  password:string;
  description:string;
  created:Date;
  updated:Date;
  deleted:boolean;
  roleId:string;
  // createdUser:User;
  // updatedUser:User;
}
