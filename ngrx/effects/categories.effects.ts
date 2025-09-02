import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { CategoriesService } from '../services/categories.service';
import * as CategoriesActions from '../actions/categories.actions';

@Injectable()
export class CategoriesEffects {

  constructor(
    private actions$: Actions,
    private categoriesService: CategoriesService
  ) {}

  getCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoriesActions.getCategories),
      switchMap((action) =>
        this.categoriesService.getCategories(
        ).pipe(
          map((data) => CategoriesActions.getCategoriesSuccess({ data })),
          catchError((error) => of(CategoriesActions.getCategoriesFailure({ error })))
        )
      )
    )
  );

  createCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoriesActions.createCategory),
      switchMap((action) =>
        this.categoriesService.createCategory(
          action.payload
        ).pipe(
          map((data) => CategoriesActions.createCategorySuccess({ data })),
          catchError((error) => of(CategoriesActions.createCategoryFailure({ error })))
        )
      )
    )
  );

  getCategoryById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoriesActions.getCategoryById),
      switchMap((action) =>
        this.categoriesService.getCategoryById(
          action.categoryId
        ).pipe(
          map((data) => CategoriesActions.getCategoryByIdSuccess({ data })),
          catchError((error) => of(CategoriesActions.getCategoryByIdFailure({ error })))
        )
      )
    )
  );

  updateCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoriesActions.updateCategory),
      switchMap((action) =>
        this.categoriesService.updateCategory(
          action.categoryId, action.payload
        ).pipe(
          map((data) => CategoriesActions.updateCategorySuccess({ data })),
          catchError((error) => of(CategoriesActions.updateCategoryFailure({ error })))
        )
      )
    )
  );

}