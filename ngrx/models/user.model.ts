export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth?: string;
  isActive: boolean;
  role: string;
  createdAt: string;
  updatedAt: string;
}