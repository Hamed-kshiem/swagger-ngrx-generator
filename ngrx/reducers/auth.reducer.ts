import { createReducer, on } from '@ngrx/store';
import * as AuthActions from '../actions/auth.actions';

export interface AuthState {
  loading: boolean;
  error: any;
  loginData: AuthResponse | null;
  registerData: AuthResponse | null;
  refreshTokenData: AuthResponse | null;
}

export const initialAuthState: AuthState = {
  loading: false,
  error: null,
  loginData: null,
  registerData: null,
  refreshTokenData: null,
};

export const authReducer = createReducer(
  initialAuthState,
  on(AuthActions.login, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(AuthActions.loginSuccess, (state, { data }) => ({
    ...state,
    loading: false,
    loginData: data
  })),
  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  on(AuthActions.register, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(AuthActions.registerSuccess, (state, { data }) => ({
    ...state,
    loading: false,
    registerData: data
  })),
  on(AuthActions.registerFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  on(AuthActions.refreshToken, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(AuthActions.refreshTokenSuccess, (state, { data }) => ({
    ...state,
    loading: false,
    refreshTokenData: data
  })),
  on(AuthActions.refreshTokenFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
);