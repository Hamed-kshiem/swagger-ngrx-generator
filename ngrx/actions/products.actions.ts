import { createAction, props } from '@ngrx/store';

// Products Actions

export const getProducts = createAction('[Products] Getproducts');
export const getProductsSuccess = createAction(
  '[Products] Getproducts Success',
  props<{ data: any }>()
);
export const getProductsFailure = createAction(
  '[Products] Getproducts Failure',
  props<{ error: any }>()
);

export const createProduct = createAction(
  '[Products] Createproduct',
  props<{ payload: any }>()
);
export const createProductSuccess = createAction(
  '[Products] Createproduct Success',
  props<{ data: Product }>()
);
export const createProductFailure = createAction(
  '[Products] Createproduct Failure',
  props<{ error: any }>()
);

export const getProductById = createAction(
  '[Products] Getproductbyid',
  props<{ productId: string }>()
);
export const getProductByIdSuccess = createAction(
  '[Products] Getproductbyid Success',
  props<{ data: Product }>()
);
export const getProductByIdFailure = createAction(
  '[Products] Getproductbyid Failure',
  props<{ error: any }>()
);

export const updateProduct = createAction(
  '[Products] Updateproduct',
  props<{ productId: string; payload: any }>()
);
export const updateProductSuccess = createAction(
  '[Products] Updateproduct Success',
  props<{ data: Product }>()
);
export const updateProductFailure = createAction(
  '[Products] Updateproduct Failure',
  props<{ error: any }>()
);

export const deleteProduct = createAction(
  '[Products] Deleteproduct',
  props<{ productId: string }>()
);
export const deleteProductSuccess = createAction(
  '[Products] Deleteproduct Success',
  props<{ data: any }>()
);
export const deleteProductFailure = createAction(
  '[Products] Deleteproduct Failure',
  props<{ error: any }>()
);

export const getProductReviews = createAction(
  '[Products] Getproductreviews',
  props<{ productId: string }>()
);
export const getProductReviewsSuccess = createAction(
  '[Products] Getproductreviews Success',
  props<{ data: Review[] }>()
);
export const getProductReviewsFailure = createAction(
  '[Products] Getproductreviews Failure',
  props<{ error: any }>()
);
