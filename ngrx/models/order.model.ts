export interface Order {
  id: string;
  userId: string;
  orderNumber: string;
  status: string;
  items: OrderItem[];
  subtotal: number;
  tax?: number;
  shipping?: number;
  total: number;
  shippingAddress?: Address;
  billingAddress?: Address;
  paymentMethod?: string;
  createdAt: string;
  updatedAt: string;
}