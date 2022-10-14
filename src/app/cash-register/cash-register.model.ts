import { User } from 'src/app/_models/user.model';

export interface ICashRegister {
  id: number;
  name: string;
  value: number;
  createdAt: Date;
  createdBy: User;
  updatedAt: Date;
  updatedBy: User;
}
