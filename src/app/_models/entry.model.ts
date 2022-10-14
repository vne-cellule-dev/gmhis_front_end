import { Bank } from "./bank.model";
import { Customer } from "./customer.model";
import { EntryType } from "./entryType.model";
import { Invoice } from "./invoice.model";
import { User } from "./user.model";

export interface Entry {
    id: 0,
    accountNumber: string,
    bank: Bank,
    chequeNumber: string,
    customer: Customer,
    entryAmount: number,
    entryNumber: string,
    entryType: EntryType,
    invoice: Invoice,
    madeBy: User,
    observation: string,
    paymentType: string

}