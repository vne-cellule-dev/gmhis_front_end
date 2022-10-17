import { User } from 'src/app/_models/user.model';

export interface IConvention {
  id: number;
  active: boolean;
  value: number;
  name: string;
  createdAt: Date;
  createdBy: User;
  updatedAt: Date;
  updatedBy: User;
}
