import { createAction, props } from '@ngrx/store';

// Orders Actions

export const getOrders = createAction('[Orders] Getorders');
export const getOrdersSuccess = createAction(
  '[Orders] Getorders Success',
  props<{ data: any }>()
);
export const getOrdersFailure = createAction(
  '[Orders] Getorders Failure',
  props<{ error: any }>()
);

export const createOrder = createAction(
  '[Orders] Createorder',
  props<{ payload: any }>()
);
export const createOrderSuccess = createAction(
  '[Orders] Createorder Success',
  props<{ data: Order }>()
);
export const createOrderFailure = createAction(
  '[Orders] Createorder Failure',
  props<{ error: any }>()
);

export const getOrderById = createAction(
  '[Orders] Getorderbyid',
  props<{ orderId: string }>()
);
export const getOrderByIdSuccess = createAction(
  '[Orders] Getorderbyid Success',
  props<{ data: Order }>()
);
export const getOrderByIdFailure = createAction(
  '[Orders] Getorderbyid Failure',
  props<{ error: any }>()
);

export const updateOrderStatus = createAction(
  '[Orders] Updateorderstatus',
  props<{ orderId: string; payload: any }>()
);
export const updateOrderStatusSuccess = createAction(
  '[Orders] Updateorderstatus Success',
  props<{ data: Order }>()
);
export const updateOrderStatusFailure = createAction(
  '[Orders] Updateorderstatus Failure',
  props<{ error: any }>()
);

export const cancelOrder = createAction(
  '[Orders] Cancelorder',
  props<{ orderId: string }>()
);
export const cancelOrderSuccess = createAction(
  '[Orders] Cancelorder Success',
  props<{ data: Order }>()
);
export const cancelOrderFailure = createAction(
  '[Orders] Cancelorder Failure',
  props<{ error: any }>()
);
