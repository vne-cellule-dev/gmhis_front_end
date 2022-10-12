import { ArticleSav } from "./articleSav.model";
import { ArticleSubFamily } from "./ArticleSubFamily.model";

export interface SparePart{
    id: number,
    articleSav: ArticleSav,
    articleSubFamily: ArticleSubFamily,
    costPrice: number,
    name: string,
    qty: number,
    salesPrice: number
}