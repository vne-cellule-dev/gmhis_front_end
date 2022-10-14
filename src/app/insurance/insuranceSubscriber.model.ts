import { User } from 'src/app/_models/user.model';

export interface IInsuranceSubscriber {
  id: number;
  name: string;
  address: string;
  code: string;
  createdAt: Date;
  createdBy: User;
  updatedAt: Date;
  updatedBy: User;
}
