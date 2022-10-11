import { ArticleSav } from "./articleSav.model";
export interface RepairEstimate{
        id: number,
        articleSav:ArticleSav,
        customerName: string,
        date: Date,
        otherServices:string,
        repairCosts: number,
        sparePart: string,
        totalAmount: number     
}