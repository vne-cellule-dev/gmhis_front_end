export interface IPatient {
  id: number;
  patientExternalId: string;
  cnamNumber: string;
  lastName: string;
  firstName: string;
  maidenName: string;
  gender: string;
  civility: string;
  birthDate: Date;
  profession: string;
  maritalStatus: string;
  numberOfChildren: number;
  address: string;
  cityId: number;
  cellPhone1: string;
  cellPhone2: string;
  email: string;
  idcardType: string;
  idCardNumber: string;
  motherFirstName: string;
  motherLastName: string;
  motherProfession: string;
  correspondant: string;
  correspondantCellPhone: string;
  emergencyContact: string;
  emergencyContact2: string;
  insurances;
}
