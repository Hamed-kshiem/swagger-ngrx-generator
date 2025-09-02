export interface UserProfile {
  id?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  phone?: string;
  address?: Address;
  preferences?: any;
  orderHistory?: OrderSummary[];
}