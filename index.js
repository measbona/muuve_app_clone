import {Navigation} from 'react-native-navigation';
import SplashScreen from 'react-native-splash-screen';

import {registerScreen, setDefaultNavigation} from './src/navigation';
import {rootInitial} from './src/navigation/screen';

import '@react-native-firebase/auth';
import '@react-native-firebase/database';
import '@react-native-firebase/firestore';
import '@react-native-firebase/dynamic-links';

import {ConfigureStore} from './src/configs/Store';
import './src/configs';

console.disableYellowBox = true;

const Store = ConfigureStore();

registerScreen(Store);
setDefaultNavigation();

Navigation.events().registerAppLaunchedListener(() => {
  setTimeout(() => {
    SplashScreen.hide();
  }, 1000);

  rootInitial();
});
