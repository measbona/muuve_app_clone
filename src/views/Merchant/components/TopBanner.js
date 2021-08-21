import React from 'react';
import {Animated, Image, StyleSheet} from 'react-native';

import utils from '../../../utils';

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
  },
  image: {
    resizeMode: 'cover',
    width: utils.device.screenWidth,
    height: utils.device.screenHeight / 4,
  },
});

export default (props) => {
  const {opacity, scale, banner} = props;

  return (
    <Animated.View style={[{opacity, transform: [{scale}]}, styles.wrapper]}>
      <Image style={styles.image} source={{uri: banner}} />
    </Animated.View>
  );
};
