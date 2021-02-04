import * as Types from '../payment.actionTypes';

const initialState = {
  formStatus: {
    message: '',
    severity: ''
  }
};

export const paymentMessage = (state = initialState, action) => {
  switch (action.type) {
    case Types.PAYMENT_SUCCESS:
      return {
        ...state,
        formStatus: {
          message: 'Payment Successfull',
          severity: 'success'
        }
      };
    case Types.PAYMENT_ERROR:
      return {
        ...state,
        formStatus: {
          message: 'Something went wrong while processing payment. Please try again.',
          severity: 'error'
        }
      };
    default:
      return state;
  }
};

export default paymentMessage;
