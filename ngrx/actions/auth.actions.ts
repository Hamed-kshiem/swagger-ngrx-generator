import { createAction, props } from '@ngrx/store';

// Auth Actions

export const login = createAction(
  '[Auth] Login',
  props<{ payload: any }>()
);
export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ data: AuthResponse }>()
);
export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: any }>()
);

export const register = createAction(
  '[Auth] Register',
  props<{ payload: any }>()
);
export const registerSuccess = createAction(
  '[Auth] Register Success',
  props<{ data: AuthResponse }>()
);
export const registerFailure = createAction(
  '[Auth] Register Failure',
  props<{ error: any }>()
);

export const refreshToken = createAction(
  '[Auth] Refreshtoken',
  props<{ payload: any }>()
);
export const refreshTokenSuccess = createAction(
  '[Auth] Refreshtoken Success',
  props<{ data: AuthResponse }>()
);
export const refreshTokenFailure = createAction(
  '[Auth] Refreshtoken Failure',
  props<{ error: any }>()
);
