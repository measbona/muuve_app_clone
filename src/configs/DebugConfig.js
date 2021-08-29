import Reactotron from 'reactotron-react-native';
import apisaucePlugin from 'reactotron-apisauce';
import sagaPlugin from 'reactotron-redux-saga';
import {reactotronRedux} from 'reactotron-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

if (__DEV__) {
  Reactotron.configure({
    name: 'Muuve',
    // host: '192.168.1.131',
    // host: '192.168.1.9',
    host: '10.10.20.253',
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
