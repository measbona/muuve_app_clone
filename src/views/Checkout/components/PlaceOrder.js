import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

import utils from '../../../utils';

const styles = StyleSheet.create({
  wrapper: {
    borderTopLeftRadius: 17,
    borderTopRightRadius: 17,
    backgroundColor: utils.colors.white,
  },
  button: {
    borderRadius: 15,
    marginVertical: 16,
    paddingVertical: 10,
    alignItems: 'center',
    marginHorizontal: 16,
    backgroundColor: utils.colors.yellow,
  },
  text: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default (props) => {
  const {onPress} = props;

  return (
    <View style={[styles.wrapper, utils.shadows.bottomBar]}>
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.7}
        onPress={onPress}>
        <Text style={styles.text}>PLACE ORDER</Text>
      </TouchableOpacity>
    </View>
  );
};
