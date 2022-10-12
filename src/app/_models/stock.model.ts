import { Article } from "./article.model";
import { Depot } from "./depot.model";

export interface Stock {
    id : number;
    article : Article;
    depot: Depot;
    qty : number;
}