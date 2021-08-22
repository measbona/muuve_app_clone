/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';

import utils from '../../../utils';

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 7,
    paddingVertical: 15,
    paddingHorizontal: 16,
    backgroundColor: utils.colors.white,
  },
  headlineWrapper: {
    marginBottom: 15,
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
  payment: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  image: {
    margin: 4,
    width: 45,
    height: 30,
  },
  row: {
    flexDirection: 'row',
  },
  column: {marginLeft: 10},
});

export default (props) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.headlineWrapper}>
        <Text style={[styles.text, {fontSize: 17}]}>Payment Option</Text>
        <TouchableOpacity style={styles.button} activeOpacity={0.7}>
          <Text style={[styles.text, {fontSize: 12}]}>Change</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.payment}>
        <View style={styles.row}>
          <Image
            style={styles.image}
            source={require('../../../assets/icons/union_pay.png')}
          />
          <View style={styles.column}>
            <Text
              style={[styles.text, {fontSize: 15, color: utils.colors.black}]}>
              UnionPay
            </Text>
            <Text
              style={[styles.text, {fontSize: 12, color: utils.colors.border}]}>
              **** **** **** 0005
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={[styles.button, {alignSelf: 'center'}]}
          activeOpacity={0.7}>
          <Text style={[styles.text, {fontSize: 12}]}>Edit Card</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
