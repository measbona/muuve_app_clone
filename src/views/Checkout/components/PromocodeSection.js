/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

import utils from '../../../utils';

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 7,
    paddingVertical: 15,
    paddingHorizontal: 16,
    backgroundColor: utils.colors.white,
  },
  headlineWrapper: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 15,
    fontWeight: 'bold',
    color: utils.colors.blue,
  },
  button: {
    borderRadius: 50,
    paddingVertical: 5,
    paddingHorizontal: 13,
    backgroundColor: utils.colors.grey,
  },
});

export default (props) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.headlineWrapper}>
        <Text style={[styles.text, {fontSize: 17}]}>Promo Code</Text>
        <TouchableOpacity style={styles.button} activeOpacity={0.7}>
          <Text style={[styles.text, {fontSize: 12}]}>Apply Promo Code</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
