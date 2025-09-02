import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from '../reducers/auth.reducer';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectAuthLoading = createSelector(
  selectAuthState,
  (state: AuthState) => state.loading
);

export const selectAuthError = createSelector(
  selectAuthState,
  (state: AuthState) => state.error
);

export const selectLoginData = createSelector(
  selectAuthState,
  (state: AuthState) => state.loginData
);

export const selectRegisterData = createSelector(
  selectAuthState,
  (state: AuthState) => state.registerData
);

export const selectRefreshtokenData = createSelector(
  selectAuthState,
  (state: AuthState) => state.refreshTokenData
);
