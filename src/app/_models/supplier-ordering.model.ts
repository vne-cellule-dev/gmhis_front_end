import { ArticleOrdered } from "./articleOrdered.model";

export interface supplierOrdering {
    articles: ArticleOrdered [],
    id: number,
    orderingDate: Date,
    orderingNumber: string,
    supplier: number, 
    currency: number
}
