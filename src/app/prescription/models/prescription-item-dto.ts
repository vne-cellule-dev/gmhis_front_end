export interface IPrescriptionItemDto {
    id: string;
    dosage: string;
    quantity: number;
    drug: string;
    collected: boolean;
    duration: string;
}
