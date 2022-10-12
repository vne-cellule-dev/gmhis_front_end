import { Supplier } from "./supplier.model";
import { User } from "./user.model";

export interface SupplierPurchase{
  accountNumber: string;
  amount: number;
  cashRegisterNumber: string;
  chequeNumber: string;
  createdBy: User;
  date: Date;
  deadline: Date;
  deliveryNoteNumber: string;
  id: 0;
  invoiceNumber: string;
  observation: string;
  orderNumber: string;
  payementType: string;
  paymentMode: string;
  supplier: Supplier
}