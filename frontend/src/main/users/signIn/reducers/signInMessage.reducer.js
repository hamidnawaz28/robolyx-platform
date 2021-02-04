import * as Types from '../signIn.actionTypes';

const initialState = {
  formStatus: {
    message: '',
    severity: ''
  }
};

export const signInMessage = (state = initialState, action) => {
  switch (action.type) {
    case Types.USER_SIGNIN_SUCCESS:
      return {
        formStatus: {
          message: 'An email has been sent to your account, kindly verify.',
          severity: 'success'
        }
      };
    case Types.USER_SIGNIN_ERROR:
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

export default signInMessage;
