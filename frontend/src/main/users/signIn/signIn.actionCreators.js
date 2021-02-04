import * as Types from './signIn.actionTypes';

export const userSignInRequest = () => ({
  type: Types.USER_SIGNIN_REQUEST
});

export const userSignInSuccess = payload => ({
  type: Types.USER_SIGNIN_SUCCESS,
  payload
});

export const userSignInError = payload => ({
  type: Types.USER_SIGNIN_ERROR,
  payload
});
