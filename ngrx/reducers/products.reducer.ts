import { createReducer, on } from '@ngrx/store';
import * as ProductsActions from '../actions/products.actions';

export interface ProductsState {
  loading: boolean;
  error: any;
  getProductsData: any | null;
  createProductData: Product | null;
  getProductByIdData: Product | null;
  updateProductData: Product | null;
  deleteProductData: any | null;
  getProductReviewsData: Review[] | null;
}

export const initialProductsState: ProductsState = {
  loading: false,
  error: null,
  getProductsData: null,
  createProductData: null,
  getProductByIdData: null,
  updateProductData: null,
  deleteProductData: null,
  getProductReviewsData: null,
};

export const productsReducer = createReducer(
  initialProductsState,
  on(ProductsActions.getProducts, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(ProductsActions.getProductsSuccess, (state, { data }) => ({
    ...state,
    loading: false,
    getProductsData: data
  })),
  on(ProductsActions.getProductsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  on(ProductsActions.createProduct, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(ProductsActions.createProductSuccess, (state, { data }) => ({
    ...state,
    loading: false,
    createProductData: data
  })),
  on(ProductsActions.createProductFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  on(ProductsActions.getProductById, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(ProductsActions.getProductByIdSuccess, (state, { data }) => ({
    ...state,
    loading: false,
    getProductByIdData: data
  })),
  on(ProductsActions.getProductByIdFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  on(ProductsActions.updateProduct, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(ProductsActions.updateProductSuccess, (state, { data }) => ({
    ...state,
    loading: false,
    updateProductData: data
  })),
  on(ProductsActions.updateProductFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  on(ProductsActions.deleteProduct, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(ProductsActions.deleteProductSuccess, (state, { data }) => ({
    ...state,
    loading: false,
    deleteProductData: data
  })),
  on(ProductsActions.deleteProductFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  on(ProductsActions.getProductReviews, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(ProductsActions.getProductReviewsSuccess, (state, { data }) => ({
    ...state,
    loading: false,
    getProductReviewsData: data
  })),
  on(ProductsActions.getProductReviewsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
);