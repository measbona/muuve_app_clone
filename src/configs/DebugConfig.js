import Reactotron from 'reactotron-react-native';
import apisaucePlugin from 'reactotron-apisauce';
import sagaPlugin from 'reactotron-redux-saga';
import {reactotronRedux} from 'reactotron-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

if (__DEV__) {
  Reactotron.configure({
    name: 'Muuve',
    // host: '0.0.0.0',
    // host: '192.168.1.244',
    // host: '172.20.10.9',
  })
    .setAsyncStorageHandler(AsyncStorage)
    .useReactNative()
    .use(reactotronRedux())
    .use(apisaucePlugin())
    .use(sagaPlugin())
    .connect();

  Reactotron.clear();

  console.tron = Reactotron;
}
