import * as Types from './payment.actionTypes';

export const paymentRequest = () => ({
  type: Types.PAYMENT_REQUEST
});

export const paymentSuccess = payload => ({
  type: Types.PAYMENT_SUCCESS,
  payload
});

export const paymentError = payload => ({
  type: Types.PAYMENT_ERROR,
  payload
});

export const setPaymentType = payload => ({
  type: Types.SET_PAYMENT_TYPE,
  payload
})