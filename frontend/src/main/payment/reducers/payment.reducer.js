import { combineReducers } from 'redux';
import * as Types from '../payment.actionTypes';
import { paymentMessage } from './paymentMessage.reducer';
import { paymentUi } from './paymentUi.reducer';

const initialState = {
  paymentInfo: {},
  paymentAmount: '0'
};

const paymentType = name => {
  const mapping = {
    basic: '10',
    standard: '20',
    plus: '30',
    premium: '40',
    default: '0'
  };

  return mapping[name];
};

export const paymentStore = (state = initialState, action) => {
  switch (action.type) {
    case Types.PAYMENT_SUCCESS:
      return {
        ...state,
        paymentInfo: action.payload,
        paymentAmount: '0'
      };
    case Types.SET_PAYMENT_TYPE:
      return {
        ...state,
        paymentAmount: paymentType(action.payload)
      };
    default:
      return state;
  }
};

export default combineReducers({
  paymentStore,
  paymentMessage,
  paymentUi
});
