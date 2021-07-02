import {Navigation} from 'react-native-navigation';
import Auth from '@react-native-firebase/auth';
import {Screens, setRootHome, showLoading, showPhoneLogin} from './screen';

export const registerScreen = () => {
  Screens.forEach((ScreenComponent, key) =>
    Navigation.registerComponent(key, () => ScreenComponent),
  );
};

export const setDefaultNavigation = () => {
  Navigation.setDefaultOptions({
    topBar: {
      visible: false,
      drawBehind: true,
      animate: false,
    },
  });
};

export const startApp = () => {
  registerScreen();

  Navigation.events().registerAppLaunchedListener(() => {
    setDefaultNavigation();

    Auth().onAuthStateChanged(async (user) => {
      if (user) {
        await showLoading();

        setRootHome()
      } else {
        showPhoneLogin();
      }
    });
  });
};
