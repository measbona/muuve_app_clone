import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {get} from 'lodash';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';

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
    padding: 5,
    right: -10,
    borderRadius: 5,
    position: 'absolute',
    backgroundColor: utils.colors.blue,
  },
});

export default (props) => {
  const {item, onPress, isSelectedItem} = props;

  const name = get(item, 'name', 'N/A');
  const logo = get(item, 'images.thumb', null);
  const price = get(item, 'current_price', 'N/A');

  const itemImageSource = logo
    ? {uri: logo}
    : require('../../../assets/images/muuve_logo.png');

  return (
    <TouchableOpacity
      style={styles.wrapper}
      activeOpacity={0.7}
      onPress={onPress}>
      <View style={styles.infoWrapper}>
        <Text style={styles.text}>{name}</Text>
        <Text style={[styles.text, {fontSize: 12}]}>{`$${price}`}</Text>
      </View>
      <View style={styles.imageWrapper}>
        <Image style={styles.itemImage} source={itemImageSource} />
        {isSelectedItem ? (
          <View style={styles.selectedBadge}>
            <MCIcon name="check" size={15} color={utils.colors.white} />
          </View>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};
