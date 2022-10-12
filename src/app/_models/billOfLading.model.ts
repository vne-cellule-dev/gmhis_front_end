import { blContainer } from "./blContainer.model";

export interface BillOfLading{
    billNumber: string,
    issueDate: Date,
    articles:string,
    containers: string,
    blContainerQty: any[],
    certificateOfOrigine: string,
    circuit: string,
    clearance: number,
    declarationNumber: string,
    deliveryDate:Date
    forcastDate: Date,
    freight: number,
    freightForwarder: number,
    id: number,
    invoiceNumber: string,
    liquidationNumber: string,
    pakageQty: number,
    puttingIntoUse: string,
    released: true,
    sentTo: string,
    shipper: string,
    state: number,
    supplierOrder: number,
    totalAmountWithFreight: number,
    totalAmountWithoutFreight: number,
    totalDeclaration: number,
    voyageNumber: string,
    vw: string,
    containerCost: string,
    containerQty: string
    loadingPort:number,
    carrier : number,
    containerCostTotalValue: number
  }