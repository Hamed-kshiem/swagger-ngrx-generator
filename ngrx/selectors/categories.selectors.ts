import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CategoriesState } from '../reducers/categories.reducer';

export const selectCategoriesState = createFeatureSelector<CategoriesState>('categories');

export const selectCategoriesLoading = createSelector(
  selectCategoriesState,
  (state: CategoriesState) => state.loading
);

export const selectCategoriesError = createSelector(
  selectCategoriesState,
  (state: CategoriesState) => state.error
);

export const selectGetcategoriesData = createSelector(
  selectCategoriesState,
  (state: CategoriesState) => state.getCategoriesData
);

export const selectCreatecategoryData = createSelector(
  selectCategoriesState,
  (state: CategoriesState) => state.createCategoryData
);

export const selectGetcategorybyidData = createSelector(
  selectCategoriesState,
  (state: CategoriesState) => state.getCategoryByIdData
);

export const selectUpdatecategoryData = createSelector(
  selectCategoriesState,
  (state: CategoriesState) => state.updateCategoryData
);
