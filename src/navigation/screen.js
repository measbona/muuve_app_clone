import {Navigation} from 'react-native-navigation';
import FontIcon from 'react-native-vector-icons/Fontisto';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import utils from '../utils';
import Home from '../views/home';
import Account from '../views/account';
import Checkout from '../views/checkout';
import Initialize from '../views/initialize';
import PhoneLogin from '../views/phone-login';
import GroupOrder from '../views/group-order';
import AccountForm from '../views/account-form';
import OrderHistory from '../views/order-history';
import OrderDetails from '../views/order-details';
import MerchantDetails from '../views/merchat-details';
import GroupOrderCart from '../views/group-order-cart';

import Toast from '../lib/Toast';
import Numpad from '../views/modal/Numpad';
import ModalChoice from '../views/modal/ModalChoice';
import ModalNotice from '../views/modal/ModalNotice';
import ModalSuccess from '../views/modal/ModalSuccess';
import ModalItemDetail from '../views/modal/ModalItemDetail';

export const HOME = 'MuuveAppClone.Home';
export const NUMPAD = 'MuuveAppClone.Numpad';
export const ACCOUNT = 'MuuveAppClone.Account';
export const CHECKOUT = 'MuuveAppClone.Checkout';
export const INITIALIZE = 'MuuveAppClone.Initialize';
export const GROUP_ORDER = 'MuuveAppClone.GroupOrder';
export const PHONE_LOGIN = 'MuuveAppClone.PhoneLogin';
export const ACCOUNT_FORM = 'MuuveAppClone.AccountForm';
export const ORDER_DETAILS = 'MuuveAppClone.OrderDetails';
export const ORDER_HISTORY = 'MuuveAppClone.OrderHistory';
export const GROUP_ORDER_CART = 'MuuveAppClone.GroupOrderCart';
export const MERCHANT_DETAILS = 'MuuveAppClone.MerchantDetails';

export const TOAST = 'MuuveAppClone.Toast';
export const MODAL_CHOICE = 'MuuveAppClone.ModalChoice';
export const MODAL_NOTICE = 'MuuveAppClone.ModalNotice';
export const MODAL_SUCCESS = 'MuuveAppClone.ModalSuccess';
export const MODAL_ITEM_DETAIL = 'MuuveAppClone.ModalItemDetail';

export const Screens = new Map();

Screens.set(HOME, Home);
Screens.set(NUMPAD, Numpad);
Screens.set(ACCOUNT, Account);
Screens.set(CHECKOUT, Checkout);
Screens.set(INITIALIZE, Initialize);
Screens.set(GROUP_ORDER, GroupOrder);
Screens.set(PHONE_LOGIN, PhoneLogin);
Screens.set(ACCOUNT_FORM, AccountForm);
Screens.set(ORDER_HISTORY, OrderHistory);
Screens.set(ORDER_DETAILS, OrderDetails);
Screens.set(MERCHANT_DETAILS, MerchantDetails);
Screens.set(GROUP_ORDER_CART, GroupOrderCart);

Screens.set(TOAST, Toast);
Screens.set(MODAL_CHOICE, ModalChoice);
Screens.set(MODAL_NOTICE, ModalNotice);
Screens.set(MODAL_SUCCESS, ModalSuccess);
Screens.set(MODAL_ITEM_DETAIL, ModalItemDetail);

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

export const popToRoot = (componentId) => Navigation.popToRoot(componentId);

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
      component: ORDER_HISTORY,
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

export const goToAccountForm = (componentId, passProps) => {
  Navigation.push(componentId, {
    component: {
      name: ACCOUNT_FORM,
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
      stack: {
        children: [
          {
            component: {
              name: PHONE_LOGIN,
            },
          },
        ],
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

export const goToMerchantDetails = (componentId, passProps) => {
  Navigation.push(componentId, {
    component: {
      name: MERCHANT_DETAILS,
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

export const showModalSuccess = (passProps) => {
  return new Promise((resolve) => {
    Navigation.showOverlay({
      component: {
        name: MODAL_SUCCESS,
        passProps: {...passProps, resolve},
        options: {
          layout: {
            backgroundColor: utils.colors.dimmer,
            componentBackgroundColor: utils.colors.dimmer,
          },
          modalPresentationStyle: 'overCurrentContext',
        },
      },
    });
  });
};

export const showNumpad = (passProps) =>
  Navigation.showOverlay({
    component: {
      name: NUMPAD,
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

export const showItemDetail = (passProps) => {
  return new Promise((resolve) => {
    Navigation.showOverlay({
      component: {
        name: MODAL_ITEM_DETAIL,
        passProps: {...passProps, resolve},
        options: {
          modalPresentationStyle: 'overCurrentContext',
        },
      },
    });
  });
};
