import { combineReducers } from 'redux';
import * as Types from '../signIn.actionTypes';
import { signInMessage } from './signInMessage.reducer';
import { signInUi } from './signInUi.reducer';

const initialState = {
  user: {}
};

export const signInStore = (state = initialState, action) => {
  switch (action.type) {
    case Types.USER_SIGNIN_SUCCESS:
      return {
        ...state,
        user: action.payload
      };
    default:
      return state;
  }
};

export default combineReducers({
  signInStore,
  signInMessage,
  signInUi
});
