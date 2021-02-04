import * as Types from '../admin.actionTypes';

const initialState = {
  formStatus: {
    message: '',
    severity: ''
  },
  blockStatus: {
    message: '',
    severity: ''
  }
};

export const adminMessage = (state = initialState, action) => {
  switch (action.type) {
    case Types.ADD_USER_SUCCESS:
      return {
        ...state,
        formStatus: {
          message: 'User added successfully',
          severity: 'success'
        }
      };
    case Types.ADD_USER_ERROR:
      return {
        ...state,
        formStatus: {
          message: 'Something went wrong while adding user. Please try again.',
          severity: 'error'
        }
      };
    case Types.GET_USER_SUCCESS:
      return {
        ...state,
        blockStatus: action.payload.length ? {
          message: 'User fetched successfully',
          severity: 'success'
        } : {
          message: 'No User found',
          severity: 'info'
        }
      };
    case Types.GET_USER_ERROR:
      return {
        ...state,
        blockStatus: {
          message: 'Something went wrong while fetching user. Please try again.',
          severity: 'error'
        }
      };
    default:
      return state;
  }
};

export default adminMessage;
