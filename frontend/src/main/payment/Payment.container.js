import { connect } from 'react-redux';
import Payment from './Payment';
import { payment, setPaymentType } from './payment.actions';

const mapStateToProps = state => ({
  //formStatus: state.login.loginMessage.formStatus,
  //isSubmitting: state.login.loginUi.isSubmitting,
  paymentAmount: state.payment.paymentStore.paymentAmount
});

const mapDispatchToProps = dispatch => ({
  payment: payload => dispatch(payment(payload)),
  setPaymentType: payload => dispatch(setPaymentType(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(Payment);
