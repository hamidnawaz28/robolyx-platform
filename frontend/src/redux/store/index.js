import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers/index';
import thunkMiddleware from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger'
import rootSaga from './root-saga'

const sagaMiddleware = createSagaMiddleware();

//const loggerMiddleware = require('redux-logger');
const middlewares = [thunkMiddleware, sagaMiddleware,]

if(process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

//const middleware = loggerMiddleware.createLogger();
//const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer, 
  applyMiddleware(...middlewares)
);

sagaMiddleware.run(rootSaga);

export default store;
