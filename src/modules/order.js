import firebase from '@react-native-firebase/app';

export default class Item {
  static getOrderHistory = async (phoneNumber) => {
    const ref = firebase.database().ref(`deliveree_orders/${phoneNumber}`);

    const snapShot = await ref.once('value');
    const orders = snapShot.val();

    return orders;
  };
}
