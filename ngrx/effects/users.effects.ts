import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { UsersService } from '../services/users.service';
import * as UsersActions from '../actions/users.actions';

@Injectable()
export class UsersEffects {

  constructor(
    private actions$: Actions,
    private usersService: UsersService
  ) {}

  getUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.getUsers),
      switchMap((action) =>
        this.usersService.getUsers(
        ).pipe(
          map((data) => UsersActions.getUsersSuccess({ data })),
          catchError((error) => of(UsersActions.getUsersFailure({ error })))
        )
      )
    )
  );

  createUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.createUser),
      switchMap((action) =>
        this.usersService.createUser(
          action.payload
        ).pipe(
          map((data) => UsersActions.createUserSuccess({ data })),
          catchError((error) => of(UsersActions.createUserFailure({ error })))
        )
      )
    )
  );

  getUserById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.getUserById),
      switchMap((action) =>
        this.usersService.getUserById(
          action.userId
        ).pipe(
          map((data) => UsersActions.getUserByIdSuccess({ data })),
          catchError((error) => of(UsersActions.getUserByIdFailure({ error })))
        )
      )
    )
  );

  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.updateUser),
      switchMap((action) =>
        this.usersService.updateUser(
          action.userId, action.payload
        ).pipe(
          map((data) => UsersActions.updateUserSuccess({ data })),
          catchError((error) => of(UsersActions.updateUserFailure({ error })))
        )
      )
    )
  );

  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.deleteUser),
      switchMap((action) =>
        this.usersService.deleteUser(
          action.userId
        ).pipe(
          map((data) => UsersActions.deleteUserSuccess({ data })),
          catchError((error) => of(UsersActions.deleteUserFailure({ error })))
        )
      )
    )
  );

  getUserProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.getUserProfile),
      switchMap((action) =>
        this.usersService.getUserProfile(
          action.userId
        ).pipe(
          map((data) => UsersActions.getUserProfileSuccess({ data })),
          catchError((error) => of(UsersActions.getUserProfileFailure({ error })))
        )
      )
    )
  );

}