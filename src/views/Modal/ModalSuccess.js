import React from 'react';
import {View, StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native';
import * as Navigator from '../../navigation/screen';

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lottie: {
    height: 100,
    width: 100,
  },
});

export default ({resolve}) => {
  setTimeout(() => {
    resolve(true);

    Navigator.dismissOverLay();
  }, 2000);

  return (
    <View style={styles.conatiner}>
      <LottieView
        autoPlay
        source={require('../../assets/animation/success.json')}
      />
    </View>
  );
};
