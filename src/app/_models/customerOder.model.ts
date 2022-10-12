import { BranchOffice } from "./branchOffice.model";
import { Customer } from "./customer.model";
import { User } from "./user.model";

export interface CustomerOrder{
    id : number;
    articles : string;
    articleQty : number;
    branchOffice : BranchOffice;
    deliveryQty: number;
    customer : Customer;
    depot: number
    date :Date;
    customerNumber : String;
    user : User;
    totalHt : number;
    totalTtc : number;
    tvaValue : number;
    airsiValue : number;
    includeTva: Boolean;
    includeAirsi: Boolean;
    excludeAirsi: Boolean;
    withoutAirsi: Boolean;
    
}