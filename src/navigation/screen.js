import {Navigation} from 'react-native-navigation';
import FontIcon from 'react-native-vector-icons/Fontisto';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import utils from '../utils';
import Home from '../views/Home';
import Order from '../views/Order';
import Account from '../views/Account';

export const HOME = 'MuuveAppClone.Home';
export const ORDER = 'MuuveAppClone.Order';
export const ACCOUNT = 'MuuveAppClone.Account';

export const Screens = new Map();

Screens.set(HOME, Home);
Screens.set(ORDER, Order);
Screens.set(ACCOUNT, Account);

const hideBottomTabs = {
  bottomTabs: {
    visible: false,
    drawBehind: true,
    animate: true,
  },
};

const bottomTabStack = ({id, component, text, icon}) => ({
  stack: {
    children: [{component: {id, name: component}}],
    options: {
      layout: {
        backgroundColor: utils.colors.white,
        components: utils.colors.white,
      },
      bottomTab: {
        text,
        icon,
        fontSize: 9,
        textColor: utils.colors.black,
        // fontFamily: 'Montserrat-Bold',
        selectedTextColor: utils.colors.yellow,
        selectedIconColor: utils.colors.yellow,
      },
    },
  },
});

export const popBack = (componentId) => Navigation.pop(componentId);

export const dismissOverLay = () => Navigation.dismissAllOverlays();

export const setRootHome = async () => {
  const homeIcon = await FontIcon.getImageSource(
    'home',
    23,
    utils.colors.black,
  );
  const bellIcon = await MCIcon.getImageSource(
    'receipt',
    23,
    utils.colors.black,
  );
  const contactIcon = await MCIcon.getImageSource(
    'account',
    23,
    utils.colors.black,
  );

  const TABS = [
    {id: 'HOME', component: HOME, text: 'Home', icon: homeIcon},
    {
      id: 'ORDER',
      component: ORDER,
      text: 'Order',
      icon: bellIcon,
    },
    {
      id: 'ACCOUNT',
      component: ACCOUNT,
      text: 'Account',
      icon: contactIcon,
    },
  ];

  Navigation.setRoot({
    root: {
      bottomTabs: {
        children: TABS.map(bottomTabStack),
      },
    },
  });
};
