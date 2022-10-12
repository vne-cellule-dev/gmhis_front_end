import { ArticleSav } from "./articleSav.model"
import { City } from "./city.model"
import { Commune } from "./commune.model"
import { Customer } from "./customer.model"
import { DeviceType } from "./device-type.model"
import { Driver } from "./driver.model"
import { FailureType } from "./failureTypeModel"
import { Guaranty } from "./guaranty.model"
import { User } from "./user.model"
import { Vehicule } from "./vehicule.model"

export interface Complaint{
  articleSav: ArticleSav,
  autoComplaintNumber : string,
  city: City,
  commune: Commune,
  complaintDate: Date,
  createdBy: User,
  currentGuaranty: boolean,
  customer: Customer,
  customerAddress: string,
  customerInvoiceNumber: string,
  customerName: string,
  deviceDiagnostic: string,
  devicePurchaseDate: Date,
  deviceSerialNumber: string,
  deviceType: DeviceType,
  failureType: FailureType,
  guaranty: Guaranty,
  guarantyEndDate: Date,
  id: 0,
  interventionObservation: string,
  interventionOutsideSav: boolean,
  interventionType: string,
  numberOfDayMaintenaince: number,
  numberOfIntervention: number,
  phone1: string,
  phone2: string,
  plannedComplaint: boolean,
  savTransmissionState: boolean,
  travelExpense: number,
  urgent: boolean,
  articleQty : number,
  transfer : boolean,
  driver : Driver,
  vehicle : Vehicule,
  transportedBy : string
  code: string,
}