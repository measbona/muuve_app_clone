import {call, put, select} from 'redux-saga/effects';
import Modules from '../modules';

import OrderActions from '../redux/OrderRedux';

export function* getOrderHistory() {
  try {
    yield put(OrderActions.setLoading(true));

    const {phone_number: phoneNumber} = yield select(
      (state) => state.profile.data,
    );

    const orders = yield call(Modules.Order.getOrderHistory, phoneNumber);

    yield put(OrderActions.setOrderHistory(orders));
    yield put(OrderActions.setLoaded(true));
    yield put(OrderActions.setLoading(false));
  } catch (error) {
    yield put(OrderActions.setLoading(false));
  }
}
