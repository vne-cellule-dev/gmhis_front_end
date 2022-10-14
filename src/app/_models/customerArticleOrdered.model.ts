import { Article } from "./article.model";
import { CustomerOrder } from "./customerOder.model";

export interface customerArticleOrdered{
    id : number;
    article : Article;
    customerOrder : CustomerOrder;
    qty : number;
    qtyDelivered : number;
    totalHt : number;
    unitPrice : number;
    quantityRemaining : number;
}