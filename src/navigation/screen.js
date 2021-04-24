import {Navigation} from 'react-native-navigation';
import FontIcon from 'react-native-vector-icons/Fontisto';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import utils from '../utils';
import Home from '../views/Home';
import Order from '../views/Order';
import Account from '../views/Account';
import ViewAccount from '../views/ViewAccount';
import GroupOrder from '../views/GroupOrder';
import Loading from '../views/Loading';
import PhoneLogin from '../views/PhoneLogin';

export const HOME = 'MuuveAppClone.Home';
export const ORDER = 'MuuveAppClone.Order';
export const ACCOUNT = 'MuuveAppClone.Account';
export const VIEW_ACCOUNT = 'MuuveAppClone.ViewAccount';
export const GROUP_ORDER = 'MuuveAppClone.GroupOrder';
export const LOADING = 'MuuveAppClone.Loading';
export const PHONE_LOGIN = 'MuuveAppClone.PhoneLogin';

export const Screens = new Map();

Screens.set(HOME, Home);
Screens.set(ORDER, Order);
Screens.set(ACCOUNT, Account);
Screens.set(VIEW_ACCOUNT, ViewAccount);
Screens.set(GROUP_ORDER, GroupOrder);
Screens.set(LOADING, Loading);
Screens.set(PHONE_LOGIN, PhoneLogin);

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
        fontWeight: 'bold',
        textColor: utils.colors.black,
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
    20,
    utils.colors.black,
  );
  const bellIcon = await MCIcon.getImageSource(
    'receipt',
    21,
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

export const goToViewAccount = (componentId, passProps) => {
  Navigation.push(componentId, {
    component: {
      name: VIEW_ACCOUNT,
      passProps,
      options: {
        ...hideBottomTabs,
      },
    },
  });
};

export const goToGroupOrder = (componentId, passProps) => {
  Navigation.push(componentId, {
    component: {
      name: GROUP_ORDER,
      passProps,
      options: {
        ...hideBottomTabs,
      },
    },
  });
};

export const showLoading = () => {
  Navigation.setRoot({
    root: {
      component: {
        name: LOADING,
      },
    },
  });
};

export const showPhoneLogin = () => {
  Navigation.setRoot({
    root: {
      component: {
        name: PHONE_LOGIN,
      },
    },
  });
};