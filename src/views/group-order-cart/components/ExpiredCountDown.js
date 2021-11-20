import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

import utils from '../../../utils';

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  text: {
    minWidth: 10,
    fontSize: 15,
    fontWeight: 'bold',
    color: utils.colors.black,
  },
});

export default ({remaining}) => {
  const minutes = Math.floor(remaining / 60);
  const second = Math.floor(remaining % 60);

  return (
    <View style={styles.wrapper}>
      <Text style={styles.text}>{minutes} : </Text>
      <Text style={styles.text}>{second} left</Text>
    </View>
  );
};
