import { createReducer, on } from '@ngrx/store';
import * as UsersActions from '../actions/users.actions';

export interface UsersState {
  loading: boolean;
  error: any;
  getUsersData: any | null;
  createUserData: User | null;
  getUserByIdData: User | null;
  updateUserData: User | null;
  deleteUserData: any | null;
  getUserProfileData: UserProfile | null;
}

export const initialUsersState: UsersState = {
  loading: false,
  error: null,
  getUsersData: null,
  createUserData: null,
  getUserByIdData: null,
  updateUserData: null,
  deleteUserData: null,
  getUserProfileData: null,
};

export const usersReducer = createReducer(
  initialUsersState,
  on(UsersActions.getUsers, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(UsersActions.getUsersSuccess, (state, { data }) => ({
    ...state,
    loading: false,
    getUsersData: data
  })),
  on(UsersActions.getUsersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  on(UsersActions.createUser, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(UsersActions.createUserSuccess, (state, { data }) => ({
    ...state,
    loading: false,
    createUserData: data
  })),
  on(UsersActions.createUserFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  on(UsersActions.getUserById, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(UsersActions.getUserByIdSuccess, (state, { data }) => ({
    ...state,
    loading: false,
    getUserByIdData: data
  })),
  on(UsersActions.getUserByIdFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  on(UsersActions.updateUser, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(UsersActions.updateUserSuccess, (state, { data }) => ({
    ...state,
    loading: false,
    updateUserData: data
  })),
  on(UsersActions.updateUserFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  on(UsersActions.deleteUser, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(UsersActions.deleteUserSuccess, (state, { data }) => ({
    ...state,
    loading: false,
    deleteUserData: data
  })),
  on(UsersActions.deleteUserFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  on(UsersActions.getUserProfile, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(UsersActions.getUserProfileSuccess, (state, { data }) => ({
    ...state,
    loading: false,
    getUserProfileData: data
  })),
  on(UsersActions.getUserProfileFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
);