export interface salesDeliveryPayment {

    id : number,
	salesDelivery: number,
	collectedBy: string,
	collectionDate: Date,
	amount: number,
	cashRegisterNumber: string,
	paymentType: string,
	chequeNumber: string,
    bank: number,
	accountNumber:string,
	observation: string
}