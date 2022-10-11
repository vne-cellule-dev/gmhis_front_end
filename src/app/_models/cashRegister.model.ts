import { Depot } from "./depot.model";

export interface CashRegister{
    id : number,
    balance : number,
    depot : Depot,
    lastCollectionDate : Date
}