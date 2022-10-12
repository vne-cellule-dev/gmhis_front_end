import { StockOutReason } from "./stockOutReason.model";
import { User } from "./user.model";

export interface StockOut{
    article: number,
    depot: number,
    id: number,
    qty: number,
    reason: StockOutReason,
    user : User,
    outputDate : Date,
    stockOutputNumber : string
  }