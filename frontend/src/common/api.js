import merge from 'lodash/merge';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import map from 'lodash/map';
import axios from 'axios';
import localStorage from './storage/localStorage';
import sessionStorage from './storage/sessionStorage';
import appEnv from '../.env';

// axios.defaults.baseURL = appEnv.apiUrl;
axios.defaults.baseURL = "http://localhost:8090/";
const getHeaders = (config) => {
  
  const user = localStorage.get('user');
  const verificationToken = sessionStorage.get('verificationToken');
  const bearerToken = () => {
    if (config.url === 'v1/users/verify' || config.url === 'v1/users/reset-password') {
      return verificationToken;
    }
    return get(user, 'access_token');
  };
  const headers = { Authorization: 'Bearer '.concat(bearerToken()) };
  return merge({}, config, { headers });
};

const getOptions = (config) => {
  const ap = appEnv
  const hasAuthenticated = !isEmpty(localStorage.get('user')) || !isEmpty(sessionStorage.get('verificationToken'));
  if (hasAuthenticated) {
    return getHeaders(config);
  }
  return config;
};

const api = (config) => {
  const options = getOptions(config);
  return axios(options);
};

export const concurrent = fns => axios.all(map(fns, f => f()));

export default api;
