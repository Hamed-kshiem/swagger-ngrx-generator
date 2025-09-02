export interface Review {
  id: string;
  userId: string;
  productId: string;
  rating: number;
  title: string;
  comment?: string;
  verified?: boolean;
  helpful?: number;
  createdAt: string;
}