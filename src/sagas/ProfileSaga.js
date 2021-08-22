import {call, put} from 'redux-saga/effects';
import * as Navigator from '../navigation/screen';
import Modules from '../modules';

import AppActions from '../redux/AppRedux';
import ProfileActions from '../redux/ProfileRedux';

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
    yield put(AppActions.handleDynamicLink());
  } catch (error) {
    alert(error.message || error);
  }
}
