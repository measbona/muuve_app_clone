import {takeLatest, takeEvery, all} from 'redux-saga/effects';

import {ProfileTypes} from '../redux/ProfileRedux';
import {RestaurantTypes} from '../redux/RestaurantRedux';
import {ItemTypes} from '../redux/ItemRedux';

import * as ProfileSaga from './ProfileSaga';
import * as RestaurantSaga from './RestaurantSaga';
import * as ItemSaga from './ItemSaga';

// eslint-disable-next-line prettier/prettier
export default store => {
  return function* root() {
    yield all([
      takeLatest(ProfileTypes.INITIAL_PROFILE, ProfileSaga.initialProfile),
      takeEvery(RestaurantTypes.GET_RESTAURANTS, RestaurantSaga.getRestaurants),
      takeLatest(ItemTypes.GET_ITEM, ItemSaga.getItem),
    ]);
  };
};
