import { Complaint } from "./complaint.model";
import { TechnicianAss } from "./TechnicianAss.model";
export interface DeviceOutput{
 id: number,
 complaintSav: Complaint,
 observation:string,
 outputDate:Date,
 outputNumber:string,
 receiverIdentityNumber:string,
 receiverName:string
 repaired : boolean,
 sparePartUsed : string,
 diagnosticTechnician : TechnicianAss,
 customerAppreciation : boolean,
 outPutQty : number
}