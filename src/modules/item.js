import {reduce, forEach} from 'lodash';
import firebase from '@react-native-firebase/app';

export default class Item {
  static getItem = async (merchantKey) => {
    const ref = firebase.database().ref(`items/${merchantKey}`);

    const snapShot = await ref.once('value');
    const items = snapShot.val();

    return items;
  };

  static mergeRestaurantsItem = async (payload) => {
    const {merchantKey, items, merchantItem} = payload;
    let newItems = {...items};

    newItems[merchantKey] = merchantItem;

    return newItems;
  };

  static serializeItems = (items) => {
    return reduce(
      items,
      (result, item, key) => {
        result[key] = {
          key,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        };

        return result;
      },
      {},
    );
  };

  static serializeGroupOrderItems = (groupOrderItems) => {
    return reduce(
      groupOrderItems,
      (result, userItems) => {
        forEach(userItems, (item, key) => {
          if (result[key]) {
            result[item.key] = {
              item_key: key,
              name: item.name,
              price: item.price,
              quantity: result[key].quantity + item.quantity,
            };
          } else {
            result[item.key] = {
              item_key: key,
              name: item.name,
              price: item.price,
              quantity: item.quantity,
            };
          }
        });

        return result;
      },
      {},
    );
  };
}
