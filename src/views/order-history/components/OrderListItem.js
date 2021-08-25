/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import moment from 'moment';
import {size} from 'lodash';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import utils from '../../../utils';

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 7,
    paddingBottom: 15,
    paddingHorizontal: 16,
    backgroundColor: utils.colors.white,
  },
  headlineWrapper: {
    marginTop: 15,
    marginBottom: 20,
  },
  text: {
    fontSize: 13,
    fontWeight: 'bold',
    color: utils.colors.black,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  orderRow: {
    paddingLeft: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconWrapper: {
    marginTop: 3,
    marginRight: 20,
    alignSelf: 'flex-start',
  },
  orderInfoWrapper: {
    alignSelf: 'flex-start',
  },
});

export default (props) => {
  const {onPress, order} = props;

  const merchantName = utils.helpers.removeWhiteSpace(order.restaurant.name);
  const itemCount = size(order.items);

  const subtotal = `${
    itemCount > 0 ? itemCount + ' Items' : itemCount + ' Item'
  } - $${parseFloat(order.sub_total)}`;

  const orderDate = order.created_at;
  const deliveryTime = order.cooking_duration + 15;

  const time = moment(orderDate).add(deliveryTime, 'minutes').format('hh:mm');
  const period = moment(orderDate).add(deliveryTime, 'minutes').format('A');

  const deliveredDate = moment(orderDate).format('DD-MMMM-YYYY');
  const deliveredTime = `Delivered - ${utils.helpers.removeLeadZeroNumber(
    time,
  )} ${period}`;

  const isGroupOrder = order.is_group_order;
  const iconName = isGroupOrder ? 'account-group' : 'food';

  return (
    <View style={styles.wrapper}>
      <View style={styles.headlineWrapper}>
        <Text style={[styles.text, {fontSize: 15}]}>{deliveredDate}</Text>
      </View>

      <TouchableOpacity
        style={styles.orderRow}
        activeOpacity={0.7}
        onPress={() => onPress()}>
        <View style={styles.row}>
          <View style={styles.iconWrapper}>
            <MCIcon name={iconName} size={25} color={utils.colors.black} />
          </View>

          <View style={styles.orderInfoWrapper}>
            <Text
              style={[
                styles.text,
                {fontSize: 15, color: utils.colors.blue, marginBottom: 3},
              ]}>
              {merchantName}
            </Text>
            <Text style={[styles.text, {marginBottom: 3}]}>{subtotal}</Text>
            <Text
              style={[
                styles.text,
                {color: utils.colors.border, marginBottom: 5},
              ]}>
              {deliveredTime}
            </Text>
          </View>
        </View>

        <View>
          <MIcon name="arrow-forward-ios" size={15} color={utils.colors.blue} />
        </View>
      </TouchableOpacity>
    </View>
  );
};
