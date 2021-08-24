import {reduce} from 'lodash';
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
      result[item.added_at] = {
          item_key: key,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        };

        return result;
      },
      {},
    );
  };
}
