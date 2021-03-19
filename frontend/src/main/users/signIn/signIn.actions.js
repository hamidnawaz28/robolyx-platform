import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import merge from 'lodash/merge';
import * as action from './signIn.actionCreators';
import api from '../../../common/api';
import localStorage from '../../../common/storage/localStorage';
import sessionStorage from '../../../common/storage/sessionStorage';
import history from '../../../common/History';

const userSignIn = credentials => (dispatch) => {
  
  dispatch(action.userSignInRequest());
  return api({
    method: 'post',
    url: 'api/auth/token-auth/',
    data: credentials  })
    .then((response) => {
      const { data, headers } = response;
      // let user = {
      //   setAuthorization: get(headers, 'access_token')
      // };
      // user = merge({}, user, data);

      let user = {  access_token : data.token,
            userId : data.user.id,
            userName : data.user.username,
            ...data.user.user_data
      }
      dispatch(action.userSignInSuccess(user));
      localStorage.set('user', user);
      // if (!isEmpty(sessionStorage.get('verificationToken'))) {
      //   sessionStorage.remove('verificationToken');
      // }
      history.push('/');
      history.go();
    })
    .catch((err) => {
      // if(credentials.email === 'hamid@gmail.com') {
      //   localStorage.set('user', {authToken: 'hamid', userGroup: 'admin'});
      //   history.push('/');
      //   history.go();
      // }
      alert("Incorrect password or email")
      dispatch(action.userSignInError(err));
    });
};

export default userSignIn;
