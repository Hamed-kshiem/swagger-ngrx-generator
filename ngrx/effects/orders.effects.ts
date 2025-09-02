import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { OrdersService } from '../services/orders.service';
import * as OrdersActions from '../actions/orders.actions';

@Injectable()
export class OrdersEffects {

  constructor(
    private actions$: Actions,
    private ordersService: OrdersService
  ) {}

  getOrders$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrdersActions.getOrders),
      switchMap((action) =>
        this.ordersService.getOrders(
        ).pipe(
          map((data) => OrdersActions.getOrdersSuccess({ data })),
          catchError((error) => of(OrdersActions.getOrdersFailure({ error })))
        )
      )
    )
  );

  createOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrdersActions.createOrder),
      switchMap((action) =>
        this.ordersService.createOrder(
          action.payload
        ).pipe(
          map((data) => OrdersActions.createOrderSuccess({ data })),
          catchError((error) => of(OrdersActions.createOrderFailure({ error })))
        )
      )
    )
  );

  getOrderById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrdersActions.getOrderById),
      switchMap((action) =>
        this.ordersService.getOrderById(
          action.orderId
        ).pipe(
          map((data) => OrdersActions.getOrderByIdSuccess({ data })),
          catchError((error) => of(OrdersActions.getOrderByIdFailure({ error })))
        )
      )
    )
  );

  updateOrderStatus$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrdersActions.updateOrderStatus),
      switchMap((action) =>
        this.ordersService.updateOrderStatus(
          action.orderId, action.payload
        ).pipe(
          map((data) => OrdersActions.updateOrderStatusSuccess({ data })),
          catchError((error) => of(OrdersActions.updateOrderStatusFailure({ error })))
        )
      )
    )
  );

  cancelOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrdersActions.cancelOrder),
      switchMap((action) =>
        this.ordersService.cancelOrder(
          action.orderId
        ).pipe(
          map((data) => OrdersActions.cancelOrderSuccess({ data })),
          catchError((error) => of(OrdersActions.cancelOrderFailure({ error })))
        )
      )
    )
  );

}