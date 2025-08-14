import { UserRole } from '../enums/UserRole';

export interface User {
  username: UserRole | string;
  password: string;
}