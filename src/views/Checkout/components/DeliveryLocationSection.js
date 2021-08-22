/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import MIcon from 'react-native-vector-icons/MaterialIcons';

import utils from '../../../utils';

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 7,
    paddingVertical: 15,
    paddingHorizontal: 16,
    backgroundColor: utils.colors.white,
  },
  headlineWrapper: {
    marginBottom: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    borderRadius: 50,
    paddingVertical: 5,
    paddingHorizontal: 13,
    backgroundColor: utils.colors.grey,
  },
  text: {
    fontSize: 11,
    fontWeight: 'bold',
    color: utils.colors.blue,
  },
  location: {flexDirection: 'row'},
});

export default ({}) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.headlineWrapper}>
        <Text style={[styles.text, {fontSize: 17}]}>Delivery Location</Text>
        <TouchableOpacity style={styles.button} activeOpacity={0.7}>
          <Text style={[styles.text, {fontSize: 12}]}>Change</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.location}>
        <MIcon
          name="my-location"
          size={18}
          style={{marginTop: 2, marginRight: 5}}
        />
        <View>
          <Text
            style={[styles.text, {fontSize: 15, color: utils.colors.black}]}>
            Current Location
          </Text>
          <Text
            style={[styles.text, {fontSize: 12, color: utils.colors.border}]}>
            Street 67 5A, 120020 Doun Penh, Cambodia
          </Text>
        </View>
      </View>
    </View>
  );
};
