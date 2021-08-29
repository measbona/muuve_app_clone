import {call, put, select} from 'redux-saga/effects';
import Modules from '../modules';

import ItemActions from '../redux/ItemRedux';

export function* getItem({merchantKey}) {
  try {
    yield put(ItemActions.setLoading(true));

    const {data: items} = yield select((state) => state.item);

    const merchantItem = yield call(Modules.Item.getItem, merchantKey);
    const mergedMerchantItem = yield call(Modules.Item.mergeRestaurantsItem, {
      merchantKey,
      items,
      merchantItem,
    });

    yield put(ItemActions.setItem(mergedMerchantItem));
    yield put(ItemActions.setLoading(false));
  } catch (error) {
    yield put(ItemActions.setLoading(false));
  }
}
