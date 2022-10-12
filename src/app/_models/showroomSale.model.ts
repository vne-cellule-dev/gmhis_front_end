import { CustomerOrder } from "./customerOder.model";

export interface ShowroomSale{
  amountAssets: 0,
  articleSold: any[],
  date:Date,
  deliveryNoteNumber: string,
  description : number,
  depot: number,
  id: number,
  invoice: number,
  invoiceState: true,
  numberOfPackages: number,
  totalCostHt: number,
  totalTtc: number,
  discount: 0,
  specialDiscount: 0;
  totalHt: number;
  tvaValue: number;
  airsiValue: number;
  includeTva: Boolean;
  includeAirsi: Boolean;
  excludeAirsi: Boolean;
  withoutAirsi: Boolean;
  invoiceNumber: string;
  deliveryAddress: string;
  customerOrderNumber: string;
  taxpayerAccount: string;  
  paymentType: string, 
  couponNumber : string,
}