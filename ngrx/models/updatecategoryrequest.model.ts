export interface UpdateCategoryRequest {
  name?: string;
  description?: string;
  slug?: string;
  parentId?: string;
  isActive?: boolean;
  sortOrder?: number;
}