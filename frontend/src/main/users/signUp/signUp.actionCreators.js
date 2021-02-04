import * as Types from './signUp.actionTypes';

export const userSignUpRequest = () => ({
  type: Types.USER_SIGNUP_REQUEST
});

export const userSignUpSuccess = payload => ({
  type: Types.USER_SIGNUP_SUCCESS,
  payload
});

export const userSignUpError = payload => ({
  type: Types.USER_SIGNUP_ERROR,
  payload
});
