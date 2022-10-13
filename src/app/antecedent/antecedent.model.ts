import { User } from 'src/app/_models/user.model';

export interface IAntecedent {
  id: number;
  name: string;
  description: string;
  createdAt: Date;
  createdBy: User;
  updatedAt: Date;
  updatedBy: User;
}
