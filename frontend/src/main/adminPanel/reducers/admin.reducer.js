import { combineReducers } from 'redux';
import * as Types from '../admin.actionTypes';
import { adminMessage } from './adminMessage.reducer';
import { adminUi } from './adminUi.reducer';

const initialState = {
  users: [],
};

export const adminStore = (state = initialState, action) => {
  switch (action.type) {
    case Types.GET_USER_SUCCESS:
      return {
        ...state,
        users: action.payload
      };
    case Types.ADD_USER_SUCCESS:
      return {
        ...state,
        users: [action.payload, ...state.users]
      };
    default:
      return state;
  }
};

export default combineReducers({
  adminStore,
  adminMessage,
  adminUi
});
