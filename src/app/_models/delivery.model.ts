import { BranchOffice } from "./branchOffice.model";
import { CustomerOrder } from "./customerOder.model";

export interface Delivery{
    articlesOrdered: [],
    branchOffice : BranchOffice
      customerOrder: CustomerOrder,
      date:Date,
      deliveryAddress: string,
      deliveryNoteNumber: string,
      description : string,
      depot: number,
      driver: number,
      id: number,
      invoice: number,
      invoiceState: true,
      numberOfPackages: number,
      totalCostHt: number,
      totalTtc: number,
      user: number,
      validatedBy: number,
      validationDate:Date,
      vehicle: number
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
      customerOrderNumber: string;
      taxpayerAccount: string; 
      paymentType: string  
    }