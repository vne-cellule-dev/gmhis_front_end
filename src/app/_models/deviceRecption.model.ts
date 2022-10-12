import { Complaint } from "./complaint.model";
import { Driver } from "./driver.model";
import { Vehicule } from "./vehicule.model";

export interface DeviceReception {
    amount: number,
    complaintSav: Complaint,
    createdBy: number,
    diagnostic: string,
    diagnosticTechnician: Driver, //à remplacer par DiagnosticTechnician
    driver: Driver,
    id: number,
    observation: string,
    receivedBy: string,
    receptionDate:Date,
    toBeInvoiced: boolean,
    transportedBy: string,
    vehicle: Vehicule,
    verdict: string,
    voucherNumber: string,
    sparePartUsed : []
}