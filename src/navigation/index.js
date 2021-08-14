import React from 'react';
import {Provider} from 'react-redux';
import {Navigation} from 'react-native-navigation';

import {Screens} from './screen';

export const registerScreen = (Store) => {
  const ScreenProvider = (Screen, props) => (
    <Provider store={Store}>
      <Screen {...props} />
    </Provider>
  );

  Screens.forEach((ScreenComponent, ScreenName) =>
    Navigation.registerComponent(
      ScreenName,
      () => (props) => ScreenProvider(ScreenComponent, props),
      () => ScreenComponent,
    ),
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
