import { Customer } from "./customer.model";

export interface BranchOffice{
  id : number;
  customer:Customer,
  isActive: true,
  name: string,
  phone: String,
  interlocutorPhone: String
}