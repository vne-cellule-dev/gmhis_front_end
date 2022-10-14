import { SupplierOrderLoading } from "./Supplier-order-loading.model";

export interface ArticleOrdered {
    supplierOrder :number,
    article: number,
    deliveryDate: Date,
    finalUnitCost: number,
    forcastDate: Date,
    id: number,
    initialUnitCost: number,
    orderingState: string,
    qty: number
    loadings: SupplierOrderLoading[]
}
