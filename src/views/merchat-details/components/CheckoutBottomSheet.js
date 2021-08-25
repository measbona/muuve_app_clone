/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {size} from 'lodash';
import * as Animatable from 'react-native-animatable';
import MIcon from 'react-native-vector-icons/MaterialIcons';

import utils from '../../../utils';

const styles = StyleSheet.create({
  wrapper: {
    left: 0,
    right: 0,
    bottom: 0,
    position: 'absolute',
    flexDirection: 'row',
    paddingHorizontal: 20,
    borderTopLeftRadius: 17,
    borderTopRightRadius: 17,
    justifyContent: 'space-between',
    backgroundColor: utils.colors.yellow,
  },
  itemCountWrapper: {
    marginVertical: 15,
    flexDirection: 'row',
  },
  text: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  priceWrapper: {alignSelf: 'flex-end'},
  price: {
    fontSize: 16,
    alignSelf: 'flex-end',
    marginLeft: 20,
    fontWeight: 'bold',
    color: utils.colors.blue,
  },
  checkoutWrapper: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  checkout: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default (props) => {
  const {cart, onPress} = props;
  const itemCount = size(cart);

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress} hitSlop={{top: 70}}>
      <Animatable.View
        duration={300}
        animation="slideInUp"
        style={[styles.wrapper, utils.shadows.bottomBar]}>
        <View style={styles.itemCountWrapper}>
          <View style={styles.priceWrapper}>
            <Text style={styles.text}>
              {itemCount === 1 ? `${itemCount} Item` : `${itemCount} Items`}
            </Text>
            <Text style={styles.text}>Total Price</Text>
          </View>
          <Text style={styles.price}>{`$${utils.helpers.sumCartTotal(
            cart,
          )}`}</Text>
        </View>
        <View style={styles.checkoutWrapper}>
          <Text style={[styles.checkout, {fontSize: 17}]}>Checkout</Text>
          <MIcon name="arrow-forward" size={18} style={{marginLeft: 5}} />
        </View>
      </Animatable.View>
    </TouchableOpacity>
  );
};
