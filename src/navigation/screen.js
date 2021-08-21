import {Navigation} from 'react-native-navigation';
import FontIcon from 'react-native-vector-icons/Fontisto';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import utils from '../utils';
import Home from '../views/Home';
import Order from '../views/Order';
import Account from '../views/Account';
import ViewAccount from '../views/ViewAccount';
import GroupOrder from '../views/GroupOrder';
import Initialize from '../views/Initialize';
import PhoneLogin from '../views/PhoneLogin';
import OrderDetails from '../views/OrderDetails';
import Merchant from '../views/Merchant';
import Checkout from '../views/Checkout';
import GroupOrderCart from '../views/GroupOrderCart';

import Toast from '../lib/Toast';
import ModalChoice from '../views/Modal/ModalChoice';
import ModalNotice from '../views/Modal/ModalNotice';

export const HOME = 'MuuveAppClone.Home';
export const ORDER = 'MuuveAppClone.Order';
export const ACCOUNT = 'MuuveAppClone.Account';
export const VIEW_ACCOUNT = 'MuuveAppClone.ViewAccount';
export const GROUP_ORDER = 'MuuveAppClone.GroupOrder';
export const INITIALIZE = 'MuuveAppClone.Initialize';
export const PHONE_LOGIN = 'MuuveAppClone.PhoneLogin';
export const ORDER_DETAILS = 'MuuveAppClone.OrderDetails';
export const MERCHANT = 'MuuveAppClone.Merchant';
export const CHECKOUT = 'MuuveAppClone.Checkout';
export const GROUP_ORDER_CART = 'MuuveAppClone.GroupOrderCart';

export const TOAST = 'MuuveAppClone.Toast';
export const MODAL_CHOICE = 'MuuveAppClone.ModalChoice';
export const MODAL_NOTICE = 'MuuveAppClone.ModalNotice';

export const Screens = new Map();

Screens.set(HOME, Home);
Screens.set(ORDER, Order);
Screens.set(ACCOUNT, Account);
Screens.set(VIEW_ACCOUNT, ViewAccount);
Screens.set(GROUP_ORDER, GroupOrder);
Screens.set(INITIALIZE, Initialize);
Screens.set(PHONE_LOGIN, PhoneLogin);
Screens.set(ORDER_DETAILS, OrderDetails);
Screens.set(MERCHANT, Merchant);
Screens.set(CHECKOUT, Checkout);
Screens.set(GROUP_ORDER_CART, GroupOrderCart);

Screens.set(TOAST, Toast);
Screens.set(MODAL_CHOICE, ModalChoice);
Screens.set(MODAL_NOTICE, ModalNotice);

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

export const bindComponent = (component) =>
  Navigation.events().bindComponent(component);

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

export const rootInitial = () => {
  Navigation.setRoot({
    root: {
      component: {
        name: INITIALIZE,
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

export const showModalChoice = (passProps) => {
  Navigation.showOverlay({
    component: {
      name: MODAL_CHOICE,
      passProps,
      options: {
        layout: {
          backgroundColor: 'transparent',
          componentBackgroundColor: 'transparent',
        },
        modalPresentationStyle: 'overCurrentContext',
      },
    },
  });
};

export const showModalNotice = (passProps) => {
  Navigation.showOverlay({
    component: {
      name: MODAL_NOTICE,
      passProps,
      options: {
        layout: {
          backgroundColor: 'transparent',
          componentBackgroundColor: 'transparent',
        },
        modalPresentationStyle: 'overCurrentContext',
      },
    },
  });
};

export const goToOrderDetails = (componentId, passProps) => {
  Navigation.push(componentId, {
    component: {
      name: ORDER_DETAILS,
      passProps,
      options: {
        ...hideBottomTabs,
      },
    },
  });
};

export const goToMerchant = (componentId, passProps) => {
  Navigation.push(componentId, {
    component: {
      name: MERCHANT,
      passProps,
      options: {
        ...hideBottomTabs,
      },
    },
  });
};

export const showToast = (passProps) =>
  Navigation.showOverlay({
    component: {
      name: TOAST,
      passProps,
      options: {
        layout: {
          componentBackgroundColor: 'transparent',
        },
        overlay: {
          interceptTouchOutside: false,
        },
      },
    },
  });

export const goToCheckout = (componentId, passProps) => {
  Navigation.push(componentId, {
    component: {
      name: CHECKOUT,
      passProps,
      options: {
        ...hideBottomTabs,
      },
    },
  });
};

export const goToGroupOrderCart = (componentId, passProps) => {
  Navigation.push(componentId, {
    component: {
      name: GROUP_ORDER_CART,
      passProps,
      options: {
        ...hideBottomTabs,
      },
    },
  });
};
