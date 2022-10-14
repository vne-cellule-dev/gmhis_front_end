import { User } from "src/app/_models/user.model";

export interface ActGroup {
    id: number;
    name: string;
    createdAt: Date;
    createdBy: User;
    updatedAt: Date;
    updatedBy: User;
}
