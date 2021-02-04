import * as action from './admin.actionCreators';
import api from '../../common/api';

export const addUser = payload => (dispatch) => {
  dispatch(action.addUserRequest());
  return api({
    method: 'post',
    url: 'v1/user',
    data: payload
  })
    .then((response) => {
      const { data } = response;
      dispatch(action.addUserSuccess(data));
    })
    .catch((err) => {
      dispatch(action.addUserError(err));
    });
};

export const getUser = () => (dispatch) => {
  dispatch(action.getUserRequest());
  return api({
    method: 'get',
    url: 'v1/user'
  })
    .then((response) => {
      const { data } = response;
      dispatch(action.getUserSuccess(data));
    })
    .catch((err) => {
      dispatch(action.getUserError(err));
    });
};
