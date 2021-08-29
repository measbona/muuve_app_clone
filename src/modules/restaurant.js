import firebase from '@react-native-firebase/app';

export default class Profile {
  static fetch = async () => {
    const ref = firebase.database().ref('restaurants');

    const snapshot = await ref.once('value');
    const restaurants = snapshot.val();

    return restaurants;
  };
}
