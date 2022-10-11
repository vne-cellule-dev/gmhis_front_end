import { Article } from "./article.model";
import { Depot } from "./depot.model";
import { User } from "./user.model";

export interface StockMovment{
    id : number;
	libelle : string;
	article : Article;
    depot : Depot;
	qtyMovement :string;
    previousStock : number;
	nextStock : number;
	dateMovement : Date;
	user : User;
    typeMovement : number;
	
}