import {call, put} from 'redux-saga/effects';
import * as Navigator from '../navigation/screen';

import Modules from '../modules';

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
    const hasDynamicLink = yield call(Modules.DynamicLinks.getInitialLink);

    if (hasDynamicLink) {
      //get group order key and join user to that collection
      alert('get group order key and join user to that collection');
    }

    yield call(Navigator.setRootHome);
  } catch (error) {
    console.tron.log(error.message);
    alert('error handledynamiclink')
  }
}
