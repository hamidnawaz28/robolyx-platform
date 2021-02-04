import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import merge from 'lodash/merge';
import * as action from './signUp.actionCreators';
import api from '../../../common/api';
import localStorage from '../../../common/storage/localStorage';
import sessionStorage from '../../../common/storage/sessionStorage';
import history from '../../../common/History';

const userSignUp = credentials => (dispatch) => {
  dispatch(action.userSignUpRequest());
  return api({
    method: 'post',
    url: 'v1/users/signUp',
    data: credentials
  })
    .then((response) => {
      const { data, headers } = response;

      let user = {
        setAuthorization: get(headers, 'access_token')
      };
      user = merge({}, user, data);
      dispatch(action.userSignUpSuccess(user));
      localStorage.set('user', user);
      if (!isEmpty(sessionStorage.get('verificationToken'))) {
        sessionStorage.remove('verificationToken');
      }
      history.push('/');
      history.go();
    })
    .catch((err) => {
      dispatch(action.userSignUpError(err));
    });
};

export default userSignUp;
