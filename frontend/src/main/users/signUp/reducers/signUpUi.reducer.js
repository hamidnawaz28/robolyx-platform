import * as Types from '../signUp.actionTypes';

const initialState = {
  isSubmitting: false
};

export const signUpUi = (state = initialState, action) => {
  switch (action.type) {
    case Types.USER_SIGNUP_REQUEST:
      return {
        ...state,
        isSubmitting: true
      };
    case Types.USER_SIGNUP_SUCCESS:
    case Types.USER_SIGNUP_ERROR:
      return {
        ...state,
        isSubmitting: false
      };
    default:
      return state;
  }
};

export default signUpUi;
