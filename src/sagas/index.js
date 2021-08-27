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

      takeLatest(OrderTypes.SYNC_GROUP_ORDER, OrderSagas.syncGroupOrder),
      takeLatest(OrderTypes.GET_ORDER_HISTORY, OrderSagas.getOrderHistory),
      takeLatest(OrderTypes.SET_GROUP_ORDER_DATA, OrderSagas.setGroupOrderData),
      takeLatest(OrderTypes.UPDATE_GROUP_ORDER_DATA, OrderSagas.updateGroupOrderData),
      takeLatest(OrderTypes.REMOVE_GROUP_ORDER_DATA, OrderSagas.removeGroupOrderData),

      takeLatest(ItemTypes.GET_ITEM, ItemSagas.getItem),
      takeEvery(RestaurantTypes.GET_RESTAURANTS, RestaurantSagas.getRestaurants),
    ]);
  };
};
