import { IInsurance } from "../insurance/insurance.model";
import { IInsuranceSubscriber } from "../insurance/insuranceSubscriber.model";
import { Patient } from "./patient";

export interface PatientInsurance {
    active: boolean,
    cardNumber: string,
    coverage: number,
    id: number,
    insurance: IInsurance,
    insuranceSuscriber: IInsuranceSubscriber,
    isPrincipalInsured: string,
    patient: Patient,
    principalInsuredAffiliation: string,
    principalInsuredContact: string,
    principalInsuredName: string
}
