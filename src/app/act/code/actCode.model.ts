import { User } from 'src/app/_models/user.model';

export interface IActCode {
  id: number;
  name: string;
  createdAt: Date;
  createdBy: User;
  updatedAt: Date;
  updatedBy: User;
}
