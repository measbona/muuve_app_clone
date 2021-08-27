/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

import utils from '../../../utils';
import Loading from '../../../lib/Loading';

const styles = StyleSheet.create({
  wrapper: {
    borderTopLeftRadius: 17,
    borderTopRightRadius: 17,
    backgroundColor: utils.colors.white,
  },
  button: {
    minHeight: 40,
    borderRadius: 15,
    marginVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
    backgroundColor: utils.colors.yellow,
  },
  text: {
    fontSize: 14,
    fontWeight: 'bold',
    color: utils.colors.black,
  },
});

export default (props) => {
  const {isReady, loading, onPress} = props;

  return (
    <View style={[styles.wrapper, utils.shadows.bottomBar]}>
      <TouchableOpacity
        disabled={loading}
        style={[styles.button, isReady && {backgroundColor: utils.colors.grey}]}
        activeOpacity={0.7}
        onPress={onPress}>
        {loading ? (
          <Loading style={{width: 40, height: 40}} />
        ) : (
          <Text style={[styles.text, isReady && {color: utils.colors.border}]}>
            Ready to Checkout
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};
