export interface CreateOrderRequest {
  items: any[];
  shippingAddress: Address;
  billingAddress?: Address;
  paymentMethod: string;
}