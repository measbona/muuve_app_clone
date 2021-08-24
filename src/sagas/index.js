import {takeLatest, takeEvery, all} from 'redux-saga/effects';

import {ProfileTypes} from '../redux/ProfileRedux';
import {RestaurantTypes} from '../redux/RestaurantRedux';
import {ItemTypes} from '../redux/ItemRedux';
import {AppTypes} from '../redux/AppRedux';

import * as ProfileSaga from './ProfileSaga';
import * as RestaurantSaga from './RestaurantSaga';
import * as ItemSaga from './ItemSaga';
import * as AppSaga from './AppSaga';

// eslint-disable-next-line prettier/prettier
export default store => {
  return function* root() {
    yield all([
      takeLatest(AppTypes.APP_INITIAL, AppSaga.appInitial),
      takeEvery(
        ProfileTypes.HANDLE_USER_PROFILE,
        ProfileSaga.handleUserProfile,
      ),
      takeLatest(AppTypes.HANDLE_DYNAMIC_LINK, AppSaga.handleDynamicLink),
      takeEvery(ProfileTypes.INITIAL_PROFILE, ProfileSaga.initialProfile),
      takeEvery(RestaurantTypes.GET_RESTAURANTS, RestaurantSaga.getRestaurants),
      takeLatest(ItemTypes.GET_ITEM, ItemSaga.getItem),
    ]);
  };
};
