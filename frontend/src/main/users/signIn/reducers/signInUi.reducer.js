import * as Types from '../signIn.actionTypes';

const initialState = {
  isSubmitting: false
};

export const signInUi = (state = initialState, action) => {
  switch (action.type) {
    case Types.USER_SIGNIN_REQUEST:
      return {
        ...state,
        isSubmitting: true
      };
    case Types.USER_SIGNIN_SUCCESS:
    case Types.USER_SIGNIN_ERROR:
      return {
        ...state,
        isSubmitting: false
      };
    default:
      return state;
  }
};

export default signInUi;
