import { createFeatureSelector, createSelector } from '@ngrx/store';
import { OrdersState } from '../reducers/orders.reducer';

export const selectOrdersState = createFeatureSelector<OrdersState>('orders');

export const selectOrdersLoading = createSelector(
  selectOrdersState,
  (state: OrdersState) => state.loading
);

export const selectOrdersError = createSelector(
  selectOrdersState,
  (state: OrdersState) => state.error
);

export const selectGetordersData = createSelector(
  selectOrdersState,
  (state: OrdersState) => state.getOrdersData
);

export const selectCreateorderData = createSelector(
  selectOrdersState,
  (state: OrdersState) => state.createOrderData
);

export const selectGetorderbyidData = createSelector(
  selectOrdersState,
  (state: OrdersState) => state.getOrderByIdData
);

export const selectUpdateorderstatusData = createSelector(
  selectOrdersState,
  (state: OrdersState) => state.updateOrderStatusData
);

export const selectCancelorderData = createSelector(
  selectOrdersState,
  (state: OrdersState) => state.cancelOrderData
);
