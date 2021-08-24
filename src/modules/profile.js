import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';

export default class Profile {
  static fetch = async () => {
    const user = auth().currentUser;
    const ref = firebase.database().ref(`users/${user.uid}`);

    const snapshot = await ref.once('value');
    const profile = snapshot.val();

    return profile;
  };

  static getCurrentUser = () => {
    return auth().currentUser;
  };

  static signOut = () => auth().signOut();

  static phoneAuth = (phoneNumber) => auth().signInWithPhoneNumber(phoneNumber);
}
