import { createAction, props } from '@ngrx/store';

// Users Actions

export const getUsers = createAction('[Users] Getusers');
export const getUsersSuccess = createAction(
  '[Users] Getusers Success',
  props<{ data: any }>()
);
export const getUsersFailure = createAction(
  '[Users] Getusers Failure',
  props<{ error: any }>()
);

export const createUser = createAction(
  '[Users] Createuser',
  props<{ payload: any }>()
);
export const createUserSuccess = createAction(
  '[Users] Createuser Success',
  props<{ data: User }>()
);
export const createUserFailure = createAction(
  '[Users] Createuser Failure',
  props<{ error: any }>()
);

export const getUserById = createAction(
  '[Users] Getuserbyid',
  props<{ userId: string }>()
);
export const getUserByIdSuccess = createAction(
  '[Users] Getuserbyid Success',
  props<{ data: User }>()
);
export const getUserByIdFailure = createAction(
  '[Users] Getuserbyid Failure',
  props<{ error: any }>()
);

export const updateUser = createAction(
  '[Users] Updateuser',
  props<{ userId: string; payload: any }>()
);
export const updateUserSuccess = createAction(
  '[Users] Updateuser Success',
  props<{ data: User }>()
);
export const updateUserFailure = createAction(
  '[Users] Updateuser Failure',
  props<{ error: any }>()
);

export const deleteUser = createAction(
  '[Users] Deleteuser',
  props<{ userId: string }>()
);
export const deleteUserSuccess = createAction(
  '[Users] Deleteuser Success',
  props<{ data: any }>()
);
export const deleteUserFailure = createAction(
  '[Users] Deleteuser Failure',
  props<{ error: any }>()
);

export const getUserProfile = createAction(
  '[Users] Getuserprofile',
  props<{ userId: string }>()
);
export const getUserProfileSuccess = createAction(
  '[Users] Getuserprofile Success',
  props<{ data: UserProfile }>()
);
export const getUserProfileFailure = createAction(
  '[Users] Getuserprofile Failure',
  props<{ error: any }>()
);
