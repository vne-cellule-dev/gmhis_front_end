import { Delivery } from "./delivery.model";

export interface Asset {
      articles: string,
      depot: number,
      id: number,
      salesDelivery: Delivery,
      assetsNumber: string;
      amountAssets: number;
}