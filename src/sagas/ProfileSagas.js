import {call, put, fork} from 'redux-saga/effects';
import * as Navigator from '../navigation/screen';
import Modules from '../modules';

import AppActions from '../redux/AppRedux';
import ProfileActions from '../redux/ProfileRedux';

export function* initialProfile() {
  const userSignedIn = yield call(Modules.Profile.getCurrentUser);

  try {
    if (!userSignedIn) {
      yield call(Navigator.showPhoneLogin);
    }

    yield put(ProfileActions.handleUserProfile({}));
  } catch (error) {
    alert(`initialProfile: ${error.message || error}`)
  }
}

export function* handleUserProfile({payload}) {
  const {componentId} = payload;

  try {
    const userProfile = yield call(Modules.Profile.fetch);
    const hasUserProfile = userProfile;

    if (hasUserProfile) {
      yield put(ProfileActions.setProfile(userProfile));
      yield put(AppActions.handleDynamicLink());
    } else {
      yield call(Navigator.goToAccountForm, componentId, {
        profile: null,
        isNewUser: true,
      });
    }
  } catch (error) {
    // alert('error handleUserProfile');
  }
}
