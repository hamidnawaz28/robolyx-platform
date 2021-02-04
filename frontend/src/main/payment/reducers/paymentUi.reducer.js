import * as Types from '../payment.actionTypes';

const initialState = {
  isSubmitting: false
};

export const paymentUi = (state = initialState, action) => {
  switch (action.type) {
    case Types.PAYMENT_REQUEST:
      return {
        ...state,
        isSubmitting: true
      };
    case Types.PAYMENT_SUCCESS:
    case Types.PAYMENT_ERROR:
      return {
        ...state,
        isSubmitting: false
      };
    default:
      return state;
  }
};

export default paymentUi;
