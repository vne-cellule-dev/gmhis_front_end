import { Bank } from "./bank.model";
import { Customer } from "./customer.model";
import { Depot } from "./depot.model";
import { EntryType } from "./entryType.model";
import { Invoice } from "./invoice.model";
import { User } from "./user.model";

export interface Fundraising{
    amount: number,
    cashRegisterNumber: string,
    collectedBy : User,
    depot: Depot,
    id: number,
    customer : Customer,
    type : boolean,
    bank: Bank,
    chequeNumber: string,
    entryAmount: number,
    entryNumber: string,
    entryType: EntryType,
    invoice: Invoice,
    createdBy: User,
    observation: string,
    paymentType: string
}