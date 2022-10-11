import { SparePart } from "./sparePart.model";

export interface SparePartStockEntry{
    id: number,
    dateEntry: Date,
    qty: number,
    sparePart: SparePart
}