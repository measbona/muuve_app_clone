/* eslint-disable prettier/prettier */
import {takeLatest, takeEvery, all} from 'redux-saga/effects';

import {AppTypes} from '../redux/AppRedux';
import {ItemTypes} from '../redux/ItemRedux';
import {OrderTypes} from '../redux/OrderRedux';
import {ProfileTypes} from '../redux/ProfileRedux';
import {RestaurantTypes} from '../redux/RestaurantRedux';

import * as AppSagas from './AppSagas';
import * as ItemSagas from './ItemSagas';
import * as OrderSagas from './OrderSagas';
import * as ProfileSagas from './ProfileSagas';
import * as RestaurantSagas from './RestaurantSagas';

export default store => {
  return function* root() {
    yield all([
      takeLatest(AppTypes.APP_INITIAL, AppSagas.appInitial),
      takeLatest(AppTypes.HANDLE_DYNAMIC_LINK, AppSagas.handleDynamicLink),

      takeEvery(ProfileTypes.INITIAL_PROFILE, ProfileSagas.initialProfile),
      takeEvery(ProfileTypes.HANDLE_USER_PROFILE, ProfileSagas.handleUserProfile,),

      takeLatest(ItemTypes.GET_ITEM, ItemSagas.getItem),
      takeLatest(OrderTypes.GET_ORDER_HISTORY, OrderSagas.getOrderHistory),
      takeEvery(RestaurantTypes.GET_RESTAURANTS, RestaurantSagas.getRestaurants),
    ]);
  };
};
