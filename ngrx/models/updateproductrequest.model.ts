export interface UpdateProductRequest {
  name?: string;
  description?: string;
  price?: number;
  categoryId?: string;
  images?: string[];
  stockQuantity?: number;
  tags?: string[];
}