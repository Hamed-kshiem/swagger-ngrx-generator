import { createAction, props } from '@ngrx/store';

// Categories Actions

export const getCategories = createAction('[Categories] Getcategories');
export const getCategoriesSuccess = createAction(
  '[Categories] Getcategories Success',
  props<{ data: Category[] }>()
);
export const getCategoriesFailure = createAction(
  '[Categories] Getcategories Failure',
  props<{ error: any }>()
);

export const createCategory = createAction(
  '[Categories] Createcategory',
  props<{ payload: any }>()
);
export const createCategorySuccess = createAction(
  '[Categories] Createcategory Success',
  props<{ data: Category }>()
);
export const createCategoryFailure = createAction(
  '[Categories] Createcategory Failure',
  props<{ error: any }>()
);

export const getCategoryById = createAction(
  '[Categories] Getcategorybyid',
  props<{ categoryId: string }>()
);
export const getCategoryByIdSuccess = createAction(
  '[Categories] Getcategorybyid Success',
  props<{ data: Category }>()
);
export const getCategoryByIdFailure = createAction(
  '[Categories] Getcategorybyid Failure',
  props<{ error: any }>()
);

export const updateCategory = createAction(
  '[Categories] Updatecategory',
  props<{ categoryId: string; payload: any }>()
);
export const updateCategorySuccess = createAction(
  '[Categories] Updatecategory Success',
  props<{ data: Category }>()
);
export const updateCategoryFailure = createAction(
  '[Categories] Updatecategory Failure',
  props<{ error: any }>()
);
