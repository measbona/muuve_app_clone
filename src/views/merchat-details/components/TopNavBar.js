import React from 'react';
import {View, StyleSheet} from 'react-native';
import * as Animatable from 'react-native-animatable';

import utils from '../../../utils';

import NavBar from '../../../lib/NavBar';

const styles = StyleSheet.create({
  primaryNavBarWrapper: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: 'absolute',
  },
});

export default (props) => {
  const {merchantName, opacity, reverseOpacity, componentId} = props;

  return (
    <View>
      <Animatable.View style={[{opacity}, styles.primaryNavBarWrapper]}>
        <NavBar
          shadow={false}
          navigateColor={utils.colors.white}
          componentId={componentId}
          style={utils.device.statusBar}
        />
      </Animatable.View>

      <Animatable.View
        style={[{opacity: reverseOpacity}, utils.shadows.lightShadow]}>
        <NavBar
          title={merchantName}
          componentId={componentId}
          style={{
            ...utils.device.statusBar,
            backgroundColor: utils.colors.yellow,
          }}
        />
      </Animatable.View>
    </View>
  );
};
