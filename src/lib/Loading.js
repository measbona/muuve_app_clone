import React from 'react';
import {StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native';

const styles = StyleSheet.create({
  lottie: {
    width: 65,
    height: 65,
  },
});

export default ({color = 'black', style}) => {
  const source =
    color === 'black'
      ? require('../assets/animation/loading-black.json')
      : require('../assets/animation/loading-yellow.json');

  return <LottieView style={[styles.lottie, style]} autoPlay source={source} />;
};
