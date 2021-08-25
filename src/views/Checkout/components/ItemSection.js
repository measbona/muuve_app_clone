/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {map} from 'lodash';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import utils from '../../../utils';

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 7,
    paddingVertical: 15,
    paddingHorizontal: 16,
    backgroundColor: utils.colors.white,
  },
  text: {
    fontSize: 15,
    fontWeight: 'bold',
    color: utils.colors.blue,
  },
  groupInfo: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  row: {flexDirection: 'row'},
  icon: {
    borderRadius: 50,
    paddingVertical: 3,
    alignSelf: 'flex-start',
    paddingHorizontal: 13,
    backgroundColor: utils.colors.grey,
  },
  column: {marginLeft: 10},
  button: {
    borderRadius: 50,
    alignSelf: 'flex-end',
    paddingVertical: 5,
    paddingHorizontal: 13,
    backgroundColor: utils.colors.grey,
  },
});

export default (props) => {
  const {
    onDecrease,
    onGroupOrderPress,
    cart,
    isStartGroupOrder,
    orderType,
    order,
  } = props;

  const isOrderDetails = orderType === 'order-details';
  const headline = isStartGroupOrder ? 'Group Order' : 'Your Order';

  const items = isOrderDetails ? order.items : cart;

  const Item = () => {
    let index = 0;

    return map(items, (item, key) => {
      const itemPrice = item.quantity * parseFloat(item.price);

      index += 1;

      return (
        <TouchableOpacity
          key={key}
          style={styles.groupInfo}
          activeOpacity={0.7}
          onPress={() => onDecrease(item)}>
          <View style={styles.row}>
            <View style={styles.icon}>
              {isOrderDetails ? (
                <Text
                  style={[
                    styles.text,
                    {color: utils.colors.black, paddingHorizontal: 5},
                  ]}>
                  {index}
                </Text>
              ) : (
                <MCIcon
                  name="playlist-edit"
                  size={20}
                  color={utils.colors.blue}
                  style={{marginLeft: 5}}
                />
              )}
            </View>

            <View style={styles.column}>
              <Text
                style={[
                  styles.text,
                  {fontSize: 14, color: utils.colors.black},
                ]}>
                {item.name}
              </Text>
              <Text
                style={[
                  styles.text,
                  {fontSize: 12, color: utils.colors.border},
                ]}>
                {''}
              </Text>
            </View>
          </View>

          <View style={[styles.row, {alignSelf: 'center'}]}>
            <Text
              style={[styles.text, {fontSize: 15, color: utils.colors.black}]}>
              {`${item.quantity} x `}
            </Text>
            <Text style={[styles.text, {fontSize: 15}]}>{`$${itemPrice}`}</Text>
          </View>
        </TouchableOpacity>
      );
    });
  };

  const GroupOrder = () => {
    return (
      <TouchableOpacity
        style={styles.groupInfo}
        activeOpacity={0.7}
        onPress={onGroupOrderPress}>
        <View style={styles.row}>
          <View style={styles.icon}>
            <MCIcon
              name="playlist-edit"
              size={20}
              color={utils.colors.blue}
              style={{marginLeft: 5}}
            />
          </View>

          <View style={styles.column}>
            <Text
              style={[styles.text, {fontSize: 14, color: utils.colors.black}]}>
              Ready to Checkout
            </Text>
            <Text
              style={[styles.text, {fontSize: 12, color: utils.colors.border}]}>
              3 Participants
            </Text>
          </View>
        </View>

        <View style={[styles.row, {alignSelf: 'center'}]}>
          <Text
            style={[styles.text, {fontSize: 15, color: utils.colors.black}]}>
            3 x{' '}
          </Text>
          <Text style={[styles.text, {fontSize: 15}]}>$5.55</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.wrapper}>
      <Text style={[styles.text, {fontSize: 17, marginBottom: 15}]}>
        {headline}
      </Text>

      {isStartGroupOrder ? GroupOrder() : Item()}

      {!isOrderDetails ? (
        <React.Fragment>
          <Text
            style={[
              styles.text,
              {fontSize: 14, color: utils.colors.black, marginBottom: 10},
            ]}>
            What if any items of your order are unavailable?
          </Text>
          <TouchableOpacity style={styles.button} activeOpacity={0.7}>
            <Text style={[styles.text, {fontSize: 12}]}>
              Replace with similiar item
            </Text>
          </TouchableOpacity>
        </React.Fragment>
      ) : null}
    </View>
  );
};
