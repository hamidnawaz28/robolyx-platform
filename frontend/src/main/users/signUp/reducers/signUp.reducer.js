import { combineReducers } from 'redux';
import * as Types from '../signUp.actionTypes';
import { signUpMessage } from './signUpMessage.reducer';
import { signUpUi } from './signUpUi.reducer';

const initialState = {
  user: {}
};

export const signUpStore = (state = initialState, action) => {
  switch (action.type) {
    case Types.USER_SIGNUP_SUCCESS:
      return {
        ...state,
        user: action.payload
      };
    default:
      return state;
  }
};

export default combineReducers({
  signUpStore,
  signUpMessage,
  signUpUi
});
