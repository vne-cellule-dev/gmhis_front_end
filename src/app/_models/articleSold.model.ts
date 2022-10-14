import { Article } from "./article.model";
import { Delivery } from "./delivery.model";

export interface ArticleSold {
    id: number ,
    article : Article
    salesDeliveryId: number,
    saleDelivery : Delivery
    articleId: number,
    qty: number,
    qtyAsset: number,
    invoiceQty: number,
    totalHt: number,
    unitPrice: number,
    invoicePrice: number,
    unitSalePrice: number,
    priceDiff: number,
    unitPurchasePrice: number,
    margin: number,
    priceDiffAccepted: boolean,
    priceDiffAccepted_by: number,
}