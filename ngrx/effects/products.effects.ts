import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ProductsService } from '../services/products.service';
import * as ProductsActions from '../actions/products.actions';

@Injectable()
export class ProductsEffects {

  constructor(
    private actions$: Actions,
    private productsService: ProductsService
  ) {}

  getProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.getProducts),
      switchMap((action) =>
        this.productsService.getProducts(
        ).pipe(
          map((data) => ProductsActions.getProductsSuccess({ data })),
          catchError((error) => of(ProductsActions.getProductsFailure({ error })))
        )
      )
    )
  );

  createProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.createProduct),
      switchMap((action) =>
        this.productsService.createProduct(
          action.payload
        ).pipe(
          map((data) => ProductsActions.createProductSuccess({ data })),
          catchError((error) => of(ProductsActions.createProductFailure({ error })))
        )
      )
    )
  );

  getProductById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.getProductById),
      switchMap((action) =>
        this.productsService.getProductById(
          action.productId
        ).pipe(
          map((data) => ProductsActions.getProductByIdSuccess({ data })),
          catchError((error) => of(ProductsActions.getProductByIdFailure({ error })))
        )
      )
    )
  );

  updateProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.updateProduct),
      switchMap((action) =>
        this.productsService.updateProduct(
          action.productId, action.payload
        ).pipe(
          map((data) => ProductsActions.updateProductSuccess({ data })),
          catchError((error) => of(ProductsActions.updateProductFailure({ error })))
        )
      )
    )
  );

  deleteProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.deleteProduct),
      switchMap((action) =>
        this.productsService.deleteProduct(
          action.productId
        ).pipe(
          map((data) => ProductsActions.deleteProductSuccess({ data })),
          catchError((error) => of(ProductsActions.deleteProductFailure({ error })))
        )
      )
    )
  );

  getProductReviews$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.getProductReviews),
      switchMap((action) =>
        this.productsService.getProductReviews(
          action.productId
        ).pipe(
          map((data) => ProductsActions.getProductReviewsSuccess({ data })),
          catchError((error) => of(ProductsActions.getProductReviewsFailure({ error })))
        )
      )
    )
  );

}