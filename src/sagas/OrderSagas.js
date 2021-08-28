import {
  put,
  fork,
  take,
  call,
  select,
  cancel,
  cancelled,
} from 'redux-saga/effects';
import {eventChannel} from 'redux-saga';
import {get, find} from 'lodash';
import * as Navigator from '../navigation/screen';
import Firestore from '@react-native-firebase/firestore';

import Modules from '../modules';

import CartActions from '../redux/CartRedux';
import OrderActions, {OrderTypes} from '../redux/OrderRedux';

const observer = (collection) => {
  const listener = eventChannel((emit) => {
    const subscriber = collection.onSnapshot(
      (snapshots) => {
        let groupOrder = {};

        snapshots.forEach((snapshot) => {
          groupOrder = snapshot.data();
        });

        emit(groupOrder);
      },
      (err) => {
        emit(new Error(err));
      },
    );

    return () => subscriber;
  });

  return listener;
};

function* subscribeGroupOrder({groupKey}) {
  const collection = Firestore()
    .collection('group_orders')
    .where('group_key', '==', groupKey);

  const channel = yield call(observer, collection);

  try {
    while (true) {
      const data = yield take(channel);

      yield put(OrderActions.setGroupOrderData(data));
    }
  } catch (err) {
    //
  } finally {
    if (yield cancelled()) {
      channel.close();
    }
  }

  return null;
}

export function* syncGroupOrder({groupKey}) {
  const groupOrderListener = yield fork(subscribeGroupOrder, {groupKey});

  yield take(OrderTypes.UN_SYNC_GROUP_ORDER);
  yield cancel(groupOrderListener);
}

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

export function* getGroupOrderData({groupKey}) {
  const {uid, phone_number, family_name, first_name} = yield select(
    (state) => state.profile.data,
  );

  try {
    const data = yield call(Modules.Order.getGroupOrder, groupKey);

    const groupOrderLink = data.link;
    const cartData = get(data, ['items', uid], {});
    const isHoster = Boolean(data.joined_users[uid]);

    const newData = {
      ...data,
      joined_users: {
        ...data.joined_users,
        [uid]: {
          key: uid,
          host: false,
          ready: false,
          joined: true,
          tel: phone_number,
          name: `${family_name} ${first_name}`,
        },
      },
    };

    if (isHoster) {
      yield put(OrderActions.updateGroupOrderData(data));
    } else {
      yield put(OrderActions.updateGroupOrderData(newData));
    }

    yield put(OrderActions.setUrl(groupOrderLink, true));
    yield put(CartActions.setCartItem(cartData));

    yield call(Navigator.setRootHome);
  } catch (error) {
    if (error === 'data-not-found') {
      return yield call(Navigator.setRootHome);
    }
    alert('Error while getting Group Order', error.message || error);
  }
}

export function* setGroupOrderData({payload}) {
  const {link, group_key} = payload;

  try {
    const ref = Firestore().collection('group_orders').doc(group_key);

    yield fork([ref, ref.set], payload);
    yield put(OrderActions.setUrl(link, true));
  } catch (error) {
    alert('Error while creating Group Order', error.message || error);
  }
}

export function* updateGroupOrderData({payload}) {
  const {group_key} = payload;

  try {
    const ref = Firestore().collection('group_orders').doc(group_key);

    yield fork([ref, ref.update], payload);
  } catch (error) {
    alert('Error while updating Group Order', error.message || error);
  }
}

export function* removeGroupOrderData({groupKey}) {
  try {
    const ref = Firestore().collection('group_orders').doc(groupKey);

    yield fork([ref, ref.delete]);
    yield put(OrderActions.setUrl('', false));
  } catch (error) {
    alert('Error while deleting Group Order', error.message || error);
  }
}
