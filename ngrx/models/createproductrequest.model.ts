export interface CreateProductRequest {
  name: string;
  description: string;
  price: number;
  categoryId: string;
  images?: string[];
  stockQuantity: number;
  tags?: string[];
}