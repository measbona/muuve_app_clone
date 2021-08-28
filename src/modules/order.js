import moment from 'moment';
import {size, get} from 'lodash';
import Database from '@react-native-firebase/database';
import Firestore from '@react-native-firebase/firestore';

import utils from '../utils';

import Item from './item';

export default class Order {
  static getOrderHistory = async (phoneNumber) => {
    const ref = Database().ref(`deliveree_orders/${phoneNumber}`);

    const snapShot = await ref.once('value');
    const orders = snapShot.val();

    return orders;
  };

  static getGroupOrder = async (groupKey) => {
    try {
      const collectionRef = Firestore()
        .collection('group_orders')
        .doc(groupKey);

      const snapshot = await collectionRef.get();
      const data = snapshot.data();

      if (data === undefined) {
        throw 'data-not-found';
      }

      return data;
    } catch (error) {
      throw error;
    }
  };

  static createCheckOutOrder = async ({props, orderKey}) => {
    const {cart, profile, restaurant, isStartGroupOrder, groupOrder} = props;

    const items = isStartGroupOrder
      ? Item.serializeGroupOrderItems(groupOrder.items)
      : Item.serializeItems(cart);

    const data = {
      items,
      key: orderKey,
      delivery_fee: 3,
      status: 'delivered',
      region: profile.region,
      deliveree: profile.uid,
      tel: profile.phone_number,
      is_group_order: isStartGroupOrder,
      delivery_address: 'current_address',
      delivery_place_name: 'Toul Tom pong',
      created_at: Number(moment().format('x')),
      sub_total: utils.helpers.sumCartTotal(cart),
      deliveree_name: `${profile.family_name} ${profile.first_name}`,
      requestCoords: {
        latitude: 11.612735616803565,
        longitude: 104.90922453012595,
      },
      restaurant: {
        key: restaurant.key,
        name: restaurant.name,
        branch: Object.values(restaurant.branches)[0],
        cooking_duration: restaurant.cooking_duration,
      },
    };

    return data;
  };

  static createGroupOrder = async ({props, url, groupKey}) => {
    const {profile, restaurant, cart} = props;

    const subTotal = utils.helpers.sumCartTotal(cart);

    const data = {
      link: url,
      sub_total: subTotal,
      group_key: groupKey,
      maximum_amount: 'unlimited',
      minimum_amount: 'unlimited',
      created_at: Number(moment().format('x')),
      restaurant: {
        key: restaurant.key,
        name: restaurant.name,
      },
      joined_users: {
        [profile.uid]: {
          key: profile.uid,
          tel: profile.phone_number,
          name: `${profile.family_name} ${profile.first_name}`,
          host: true,
          joined: true,
          ready: true,
        },
      },
      ...(size(cart) > 0
        ? {
            items: {
              [profile.uid]: cart,
            },
          }
        : {
            item: {},
          }),
    };

    return data;
  };
}
