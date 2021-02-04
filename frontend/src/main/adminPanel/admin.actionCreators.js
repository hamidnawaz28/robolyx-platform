import * as Types from './admin.actionTypes';

export const addUserRequest = () => ({
  type: Types.ADD_USER_REQUEST
});

export const addUserSuccess = payload => ({
  type: Types.ADD_USER_SUCCESS,
  payload
});

export const addUserError = payload => ({
  type: Types.ADD_USER_ERROR,
  payload
});

export const getUserRequest = () => ({
  type: Types.GET_USER_REQUEST
});
  
export const getUserSuccess = payload => ({
  type: Types.GET_USER_SUCCESS,
  payload
});
  
export const getUserError = payload => ({
  type: Types.GET_USER_ERROR,
  payload
});
  