export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  images?: string[];
  inStock: boolean;
  stockQuantity: number;
  rating?: number;
  reviewCount?: number;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
}