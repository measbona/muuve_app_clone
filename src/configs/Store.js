import {createStore, applyMiddleware, compose} from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer from '../redux';
import rootSaga from '../sagas';

export const ConfigureStore = () => {
  const enhancers = [];
  let sagaMonitor = null;
  let storeMonitor = null;

  const sagaMiddleware = createSagaMiddleware({sagaMonitor});

  enhancers.push(applyMiddleware(sagaMiddleware));
  if (storeMonitor) {
    enhancers.push(storeMonitor);
  }

  const Store = createStore(rootReducer, compose(...enhancers));

  sagaMiddleware.run(rootSaga(Store));

  return Store;
};
