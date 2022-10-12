import { Bank } from "./bank.model";
import { Depot } from "./depot.model";
import { FinancialCharge } from "./financialChanrge.model";
import { User } from "./user.model";
export interface Expense {
  id:number,
  amount:number,
  bank:Bank,
  createdBy : User,
  dateExpense : Date,
  depot:Depot,
  financialCharge:FinancialCharge,
  journalId : number,
  madeBy : User,
  observation : User,
  paymentType:number,  
}