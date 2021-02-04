import * as action from './payment.actionCreators';
import api from '../../common/api';

export const payment = payload => (dispatch) => {
  dispatch(action.paymentRequest());
  return api({
    method: 'post',
    url: 'v1/payment',
    data: payload
  })
    .then((response) => {
      const { data } = response;
      dispatch(action.paymentSuccess(data));
    })
    .catch((err) => {
      dispatch(action.paymentError(err));
    });
};

export const setPaymentType = payload => (dispatch) => {
  dispatch(action.setPaymentType(payload));
}
