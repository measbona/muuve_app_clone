import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {get} from 'lodash';
import ADIcon from 'react-native-vector-icons/AntDesign';

import utils from '../../../utils';

import Rating from './Rating';
import Categories from './Categories';
import PreparationTime from './PreparationTime';

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 15,
    borderRadius: 17,
    paddingVertical: 10,
    marginHorizontal: 15,
    backgroundColor: utils.colors.white,
  },
  merchantNameWrapper: {
    paddingBottom: 5,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 12,
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 15,
    fontWeight: 'bold',
    color: utils.colors.blue,
  },
  merchantPreparation: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    justifyContent: 'space-between',
  },
});

export default (props) => {
  const {restaurant} = props;

  const merchantName = get(restaurant, 'name', 'N/A');
  const deliveryFee = get(restaurant, 'delivery_fee', 'FREE');

  return (
    <View style={[styles.wrapper, utils.shadows.logoutShadow]}>
      <View style={styles.merchantNameWrapper}>
        <Text style={styles.text}>{merchantName}</Text>
        <ADIcon name="hearto" size={20} color={utils.colors.red} />
      </View>
      <Categories />
      <View style={styles.merchantPreparation}>
        <Rating />
        <PreparationTime deliveryFee={deliveryFee} />
      </View>
    </View>
  );
};
