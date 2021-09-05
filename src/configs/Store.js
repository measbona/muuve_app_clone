import {createStore, applyMiddleware, compose} from 'redux';
import Reactotron from 'reactotron-react-native';
import createSagaMiddleware from 'redux-saga';

import rootReducer from '../redux';
import rootSaga from '../sagas';

export const ConfigureStore = () => {
  const enhancers = [];
  let sagaMonitor = null;
  let storeMonitor = null;

  if (__DEV__) {
    sagaMonitor = Reactotron.createSagaMonitor();
    storeMonitor = Reactotron.createEnhancer();
  }

  const sagaMiddleware = createSagaMiddleware({sagaMonitor});

  enhancers.push(applyMiddleware(sagaMiddleware));
  if (storeMonitor) {
    enhancers.push(storeMonitor);
  }

  const Store = createStore(rootReducer, compose(...enhancers));

  sagaMiddleware.run(rootSaga(Store));

  return Store;
};
