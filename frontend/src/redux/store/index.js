import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers/index';
import thunkMiddleware from 'redux-thunk';
const loggerMiddleware = require('redux-logger');

const middleware = loggerMiddleware.createLogger();
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer, 
  composeEnhancer(applyMiddleware(middleware,thunkMiddleware))
);

export default store;
