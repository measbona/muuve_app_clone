import {call, put} from 'redux-saga/effects';
import * as Navigator from '../navigation/screen';

import Modules from '../modules';

import OrderActions from '../redux/OrderRedux';
import ProfileActions from '../redux/ProfileRedux';
import RestaurantsActions from '../redux/RestaurantRedux';

export function* appInitial() {
  try {
    yield put(RestaurantsActions.getRestaurants());
    yield put(ProfileActions.initialProfile());
  } catch (error) {
    alert(error.message || error);
  }
}

export function* handleDynamicLink() {
  try {
    const dynamicLink = yield call(Modules.DynamicLinks.getInitialLink);
    const hasDynamicLink = dynamicLink;

    if (hasDynamicLink) {
      const groupOrderKey = dynamicLink.split('=')[1];

      yield put(OrderActions.getGroupOrderData(groupOrderKey));
    } else {
      yield call(Navigator.setRootHome);
    }
  } catch (error) {
    console.tron.log(error);
    alert('error handledynamiclink');
  }
}
