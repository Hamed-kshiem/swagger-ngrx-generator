import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductsState } from '../reducers/products.reducer';

export const selectProductsState = createFeatureSelector<ProductsState>('products');

export const selectProductsLoading = createSelector(
  selectProductsState,
  (state: ProductsState) => state.loading
);

export const selectProductsError = createSelector(
  selectProductsState,
  (state: ProductsState) => state.error
);

export const selectGetproductsData = createSelector(
  selectProductsState,
  (state: ProductsState) => state.getProductsData
);

export const selectCreateproductData = createSelector(
  selectProductsState,
  (state: ProductsState) => state.createProductData
);

export const selectGetproductbyidData = createSelector(
  selectProductsState,
  (state: ProductsState) => state.getProductByIdData
);

export const selectUpdateproductData = createSelector(
  selectProductsState,
  (state: ProductsState) => state.updateProductData
);

export const selectDeleteproductData = createSelector(
  selectProductsState,
  (state: ProductsState) => state.deleteProductData
);

export const selectGetproductreviewsData = createSelector(
  selectProductsState,
  (state: ProductsState) => state.getProductReviewsData
);
