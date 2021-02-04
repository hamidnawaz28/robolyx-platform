import { connect } from 'react-redux';
import SignUp from './SignUp';
import userSignUp from './signUp.actions';

const mapStateToProps = state => ({
  formStatus: state.signUp.signUpMessage.formStatus,
  isSubmitting: state.signUp.signUpUi.isSubmitting
});

const mapDispatchToProps = dispatch => ({
  userSignUp: credentials => dispatch(userSignUp(credentials))
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
