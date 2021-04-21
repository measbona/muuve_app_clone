import {Navigation} from 'react-native-navigation';
import {setRootHome, Screens} from './screen';

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

    setRootHome();
  });
};
