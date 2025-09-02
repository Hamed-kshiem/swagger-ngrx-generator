import { createReducer, on } from '@ngrx/store';
import * as OrdersActions from '../actions/orders.actions';

export interface OrdersState {
  loading: boolean;
  error: any;
  getOrdersData: any | null;
  createOrderData: Order | null;
  getOrderByIdData: Order | null;
  updateOrderStatusData: Order | null;
  cancelOrderData: Order | null;
}

export const initialOrdersState: OrdersState = {
  loading: false,
  error: null,
  getOrdersData: null,
  createOrderData: null,
  getOrderByIdData: null,
  updateOrderStatusData: null,
  cancelOrderData: null,
};

export const ordersReducer = createReducer(
  initialOrdersState,
  on(OrdersActions.getOrders, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(OrdersActions.getOrdersSuccess, (state, { data }) => ({
    ...state,
    loading: false,
    getOrdersData: data
  })),
  on(OrdersActions.getOrdersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  on(OrdersActions.createOrder, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(OrdersActions.createOrderSuccess, (state, { data }) => ({
    ...state,
    loading: false,
    createOrderData: data
  })),
  on(OrdersActions.createOrderFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  on(OrdersActions.getOrderById, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(OrdersActions.getOrderByIdSuccess, (state, { data }) => ({
    ...state,
    loading: false,
    getOrderByIdData: data
  })),
  on(OrdersActions.getOrderByIdFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  on(OrdersActions.updateOrderStatus, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(OrdersActions.updateOrderStatusSuccess, (state, { data }) => ({
    ...state,
    loading: false,
    updateOrderStatusData: data
  })),
  on(OrdersActions.updateOrderStatusFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  on(OrdersActions.cancelOrder, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(OrdersActions.cancelOrderSuccess, (state, { data }) => ({
    ...state,
    loading: false,
    cancelOrderData: data
  })),
  on(OrdersActions.cancelOrderFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
);