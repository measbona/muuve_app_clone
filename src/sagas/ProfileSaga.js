import {call, put} from 'redux-saga/effects';
import * as Navigator from '../navigation/screen';
import Modules from '../modules';

import ProfileActions from '../redux/ProfileRedux';
import RestaurantsActions from '../redux/RestaurantRedux';

const alertError = (error) => {
  if (error && error.message) {
    alert(error.message);
  } else {
    alert(error);
  }
};

export function* initialProfile() {
  const userSignedIn = yield call(Modules.Profile.getCurrentUser);

  if (!userSignedIn) {
    return yield call(Navigator.showPhoneLogin);
  }

  return yield call(handleUserProfile);
}

function* handleUserProfile() {
  try {
    const userProfile = yield call(Modules.Profile.fetch);

    yield put(ProfileActions.setProfile(userProfile));
    yield put(RestaurantsActions.getRestaurants());

    yield call(Navigator.setRootHome);
  } catch (error) {
    yield call(alertError, error);
  }
}
