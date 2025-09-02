import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import * as AuthActions from '../actions/auth.actions';

@Injectable()
export class AuthEffects {

  constructor(
    private actions$: Actions,
    private authService: AuthService
  ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      switchMap((action) =>
        this.authService.login(
          action.payload
        ).pipe(
          map((data) => AuthActions.loginSuccess({ data })),
          catchError((error) => of(AuthActions.loginFailure({ error })))
        )
      )
    )
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.register),
      switchMap((action) =>
        this.authService.register(
          action.payload
        ).pipe(
          map((data) => AuthActions.registerSuccess({ data })),
          catchError((error) => of(AuthActions.registerFailure({ error })))
        )
      )
    )
  );

  refreshToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.refreshToken),
      switchMap((action) =>
        this.authService.refreshToken(
          action.payload
        ).pipe(
          map((data) => AuthActions.refreshTokenSuccess({ data })),
          catchError((error) => of(AuthActions.refreshTokenFailure({ error })))
        )
      )
    )
  );

}