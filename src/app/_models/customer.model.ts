import { BranchOffice } from "./branchOffice.model";
import { CustomerAccount } from "./customerAccount.model";
import { CustomerFamily } from "./customerFamily.model";
import { Promotion } from "./promotion.model";

export interface Customer {
  
  address: string,
  initialBalance: number,
  branchOffice : BranchOffice,
  ceilingBalance: number,
  corporateName: string,
  customerFamily: CustomerFamily,
  customerNumber: string,
  customerAccount : CustomerAccount,
  deliveryAddress: string,
  email: string,
  guarantorFirstName: string,
  guaranteeImageUrl: string,
  guarantorLastName: string,
  guarantorContact : string,
  id: number,
  interlocutorName: string,
  interlocutorPhone: string,
  inventoryState: true,
  isActive: true,
  paymentDeadline: number,
  phone: string,
  promotion : Promotion
  promotionState: true,
  tradeName: string,
  tradeRegisterNumber: string,
  centralizedBranchAccount: string,
  hasBranchOffice: string,
}