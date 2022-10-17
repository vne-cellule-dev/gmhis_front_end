import { IInsurance } from "../insurance/insurance.model";
import { IInsuranceSubscriber } from "../insurance/insuranceSubscriber.model";
import { IPatient } from "./patient";

export interface PatientInsurance {
    active: boolean,
    cardNumber: string,
    coverage: number,
    id: number,
    insurance: IInsurance,
    insuranceSuscriber: IInsuranceSubscriber,
    isPrincipalInsured: string,
    patient: IPatient,
    principalInsuredAffiliation: string,
    principalInsuredContact: string,
    principalInsuredName: string
}
