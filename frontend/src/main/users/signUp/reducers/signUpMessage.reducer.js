import * as Types from '../signUp.actionTypes';

const initialState = {
  formStatus: {
    message: '',
    severity: ''
  }
};

export const signUpMessage = (state = initialState, action) => {
  switch (action.type) {
    case Types.USER_SIGNUP_SUCCESS:
      return {
        formStatus: {
          message: 'An email has been sent to your account, kindly verify.',
          severity: 'success'
        }
      };
    case Types.USER_SIGNUP_ERROR:
      return {
        ...state,
        formStatus: {
          message: 'Something went wrong while Signing Up. Please try again.',
          severity: 'error'
        }
      };
    default:
      return state;
  }
};

export default signUpMessage;
