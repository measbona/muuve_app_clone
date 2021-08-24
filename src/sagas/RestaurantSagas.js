import {call, put} from 'redux-saga/effects';

import Modules from '../modules';
import RestaurantActions from '../redux/RestaurantRedux';

export function* getRestaurants() {
  try {
    const restaurants = yield call(Modules.Restaurant.fetch);

    yield put(RestaurantActions.setRestaurants(restaurants));
    yield put(RestaurantActions.setLoaded(true));
  } catch (error) {
    yield put(RestaurantActions.setLoaded(false));
  }
}
