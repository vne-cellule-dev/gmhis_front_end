export interface SupplierPayement{  
  billOfLading: number,
  id: number,
  note: string,
  paymentAmount: number,
  paymentDate: Date,
  paymentStatus: string,
  paymentMethod: string,
  paymentBank: number
}