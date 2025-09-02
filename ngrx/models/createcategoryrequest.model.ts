export interface CreateCategoryRequest {
  name: string;
  description?: string;
  slug: string;
  parentId?: string;
  sortOrder?: number;
}