import * as Types from '../admin.actionTypes';

const initialState = {
  isSubmitting: false,
  isFetching: false
};

export const adminUi = (state = initialState, action) => {
  switch (action.type) {
    case Types.ADD_USER_REQUEST:
      return {
        ...state,
        isSubmitting: true
      };
    case Types.ADD_USER_SUCCESS:
    case Types.ADD_USER_ERROR:
      return {
        ...state,
        isSubmitting: false
      };
    case Types.GET_USER_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case Types.GET_USER_SUCCESS:
    case Types.GET_USER_ERROR:
      return {
        ...state,
        isFetching: false
      };
    default:
      return state;
  }
};

export default adminUi;
