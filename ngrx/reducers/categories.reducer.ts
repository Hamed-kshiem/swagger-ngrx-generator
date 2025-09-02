import { createReducer, on } from '@ngrx/store';
import * as CategoriesActions from '../actions/categories.actions';

export interface CategoriesState {
  loading: boolean;
  error: any;
  getCategoriesData: Category[] | null;
  createCategoryData: Category | null;
  getCategoryByIdData: Category | null;
  updateCategoryData: Category | null;
}

export const initialCategoriesState: CategoriesState = {
  loading: false,
  error: null,
  getCategoriesData: null,
  createCategoryData: null,
  getCategoryByIdData: null,
  updateCategoryData: null,
};

export const categoriesReducer = createReducer(
  initialCategoriesState,
  on(CategoriesActions.getCategories, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(CategoriesActions.getCategoriesSuccess, (state, { data }) => ({
    ...state,
    loading: false,
    getCategoriesData: data
  })),
  on(CategoriesActions.getCategoriesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  on(CategoriesActions.createCategory, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(CategoriesActions.createCategorySuccess, (state, { data }) => ({
    ...state,
    loading: false,
    createCategoryData: data
  })),
  on(CategoriesActions.createCategoryFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  on(CategoriesActions.getCategoryById, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(CategoriesActions.getCategoryByIdSuccess, (state, { data }) => ({
    ...state,
    loading: false,
    getCategoryByIdData: data
  })),
  on(CategoriesActions.getCategoryByIdFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  on(CategoriesActions.updateCategory, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(CategoriesActions.updateCategorySuccess, (state, { data }) => ({
    ...state,
    loading: false,
    updateCategoryData: data
  })),
  on(CategoriesActions.updateCategoryFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
);