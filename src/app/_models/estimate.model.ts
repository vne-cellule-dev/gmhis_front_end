import { BranchOffice } from "./branchOffice.model";
import { Customer } from "./customer.model";
import { User } from "./user.model";

export interface Estimate {
    id : number;
    articles : string;
    articleQty : number;
    customer : Customer;
    date :Date;
    estimateNumber : String;
    branchOffice : BranchOffice;
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