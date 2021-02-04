import { connect } from 'react-redux';
import SignIn from './SignIn';
import userSignIn from './signIn.actions';

const mapStateToProps = state => ({
  formStatus: state.signIn.signInMessage.formStatus,
  isSubmitting: state.signIn.signInUi.isSubmitting
});

const mapDispatchToProps = dispatch => ({
  userSignIn: credentials => dispatch(userSignIn(credentials))
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
