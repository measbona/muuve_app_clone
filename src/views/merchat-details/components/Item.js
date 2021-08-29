/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {get} from 'lodash';

import utils from '../../../utils';

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    paddingHorizontal: 25,
    justifyContent: 'space-between',
  },
  infoWrapper: {
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  imageWrapper: {
    alignItems: 'flex-end',
    backgroundColor: utils.colors.grey,
  },
  itemImage: {
    width: 70,
    height: 70,
  },
  selectedBadge: {
    top: -10,
    width: 25,
    height: 25,
    right: -10,
    borderRadius: 5,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: utils.colors.blue,
  },
});

export default (props) => {
  const {
    item,
    cart,
    onPress,
    itemImage,
    isSelectedItem,
    disabled = false,
    isGroupOrderListing = false,
  } = props;

  const name = get(item, 'name', 'N/A');
  const logo = itemImage ? itemImage : get(item, 'images.thumb', null);
  const price = item.current_price
    ? get(item, 'current_price', 'N/A')
    : get(item, 'price', 'N/A');
  const quantity = (isSelectedItem && cart[item.key].quantity) || null;

  const itemImageSource = logo
    ? {uri: logo}
    : require('../../../assets/images/muuve_logo.png');

  const itemName = isGroupOrderListing ? `${name} x ${item.quantity}` : name;

  return (
    <TouchableOpacity
      style={styles.wrapper}
      activeOpacity={0.7}
      disabled={disabled}
      onPress={onPress}>
      <View style={styles.infoWrapper}>
        <Text style={styles.text}>{itemName}</Text>
        <Text style={[styles.text, {fontSize: 12}]}>{`$${price}`}</Text>
      </View>
      <View style={styles.imageWrapper}>
        <Image style={styles.itemImage} source={itemImageSource} />

        {isSelectedItem ? (
          <View style={styles.selectedBadge}>
            <Text style={[styles.text, {color: utils.colors.white}]}>
              {quantity}
            </Text>
          </View>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};
