import { SparePart } from "./sparePart.model";
import { User } from "./user.model";

export interface SparePartStockMovement{
    id : number,
    libelle : string,
    dateMovement : Date,
    nextStock : number,
    previousStock : number,
    qtyMovement : number,
    spartPart : SparePart,
    user : User
}