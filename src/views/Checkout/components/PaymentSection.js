/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import utils from '../../../utils';

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 30,
    paddingVertical: 15,
    paddingHorizontal: 16,
    backgroundColor: utils.colors.white,
  },
  row: {
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 15,
    fontWeight: 'bold',
    color: utils.colors.blue,
  },
});

export default ({cart, orderType, order}) => {
  const isOrderDetails = orderType === 'order-details';

  const total = isOrderDetails
    ? order.sub_total
    : utils.helpers.sumCartTotal(cart);

  const deliveryFee = isOrderDetails ? `$${order.delivery_fee}` : 'FREE';

  return (
    <View style={styles.wrapper}>
      <Text style={[styles.text, {fontSize: 17, marginBottom: 10}]}>
        Payment
      </Text>
      <View>
        <View style={styles.row}>
          <Text style={[styles.text, {color: utils.colors.black}]}>Total</Text>
          <Text style={[styles.text, {color: utils.colors.black}]}>
            ${total}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={[styles.text, {color: utils.colors.black}]}>
            Delivery Fee
          </Text>
          <Text style={styles.text}>{deliveryFee}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.text}>Grand Total</Text>
          <Text style={styles.text}>${total}</Text>
        </View>
      </View>
    </View>
  );
};
