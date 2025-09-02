import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UsersState } from '../reducers/users.reducer';

export const selectUsersState = createFeatureSelector<UsersState>('users');

export const selectUsersLoading = createSelector(
  selectUsersState,
  (state: UsersState) => state.loading
);

export const selectUsersError = createSelector(
  selectUsersState,
  (state: UsersState) => state.error
);

export const selectGetusersData = createSelector(
  selectUsersState,
  (state: UsersState) => state.getUsersData
);

export const selectCreateuserData = createSelector(
  selectUsersState,
  (state: UsersState) => state.createUserData
);

export const selectGetuserbyidData = createSelector(
  selectUsersState,
  (state: UsersState) => state.getUserByIdData
);

export const selectUpdateuserData = createSelector(
  selectUsersState,
  (state: UsersState) => state.updateUserData
);

export const selectDeleteuserData = createSelector(
  selectUsersState,
  (state: UsersState) => state.deleteUserData
);

export const selectGetuserprofileData = createSelector(
  selectUsersState,
  (state: UsersState) => state.getUserProfileData
);
