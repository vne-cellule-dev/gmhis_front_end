import { User } from 'src/app/_models/user.model';

export interface IInsurance {
  id: number;
  name: string;
  account: string;
  address: string;
  code: string;
  createdAt: Date;
  createdBy: User;
  updatedAt: Date;
  updatedBy: User;
}
