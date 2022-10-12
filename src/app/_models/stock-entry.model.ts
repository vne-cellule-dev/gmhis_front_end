import { Article } from "./article.model";
import { BillOfLading } from "./billOfLading.model";
import { User } from "./user.model";

export interface StockEntry {
   article : Article 
    billOfLadingContainer: number,
    billOfLading : BillOfLading,
    depot: number,
    entryBy: User,
    entryDate: Date,
    firstValidation: Boolean,
    firstValidationBy: User,
    firstValidationDate: Date,
    id: number,
    qty: number,
    secondValidation: boolean,
    secondValidationBy: number,
    secondValidationDate: Date,
    containerNumber : string
    unitFinalPurchasePrice : number,
	  averageCostState : string,
    containerCostTotalValue : number,
    averageCostExchangeRate : number,
    averageCostDate : Date,
    articlesStatusBeforeAverageCost : String,
    qtyBeforeEntry : number,
    qtyAfterEntry : number
  }