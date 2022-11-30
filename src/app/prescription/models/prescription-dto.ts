import { IPrescriptionItemDto } from "./prescription-item-dto";

export interface IPrescriptionDto {
    id : number,
    examinationId: number,
    observation: string,
   prescriptionItemsDto: IPrescriptionItemDto []
}
