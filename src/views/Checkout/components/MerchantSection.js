/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import moment from 'moment';
import LottieView from 'lottie-react-native';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import IIcon from 'react-native-vector-icons/Ionicons';

import utils from '../../../utils';

const styles = StyleSheet.create({
  wrapper: {
    paddingTop: 15,
    marginBottom: 7,
    paddingHorizontal: 16,
    backgroundColor: utils.colors.white,
  },
  sectionWrapper: {
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headlineWrapper: {
    marginBottom: 5,
  },
  text: {
    fontSize: 17,
    fontWeight: 'bold',
    color: utils.colors.blue,
  },
  row: {flexDirection: 'row'},
  clockWrapper: {
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  button: {
    borderRadius: 50,
    paddingVertical: 5,
    paddingHorizontal: 13,
    backgroundColor: utils.colors.grey,
  },
  lottieWrapper: {
    alignSelf: 'flex-end',
  },
  lottie: {
    top: 5,
    right: 5,
    width: 100,
    height: 100,
  },
  statusWrapper: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  line: {
    top: 8,
    left: 0,
    right: 0,
    borderWidth: 3,
    borderRadius: 50,
    position: 'absolute',
    borderColor: utils.colors.yellow,
  },
  circleWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    width: utils.device.isIphoneX ? null : 60,
  },
  circle: {
    width: 23,
    height: 23,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: utils.colors.yellow,
  },
});

export default ({restaurant, orderType, order}) => {
  const isOrderDetails = orderType === 'order-details';

  const merchant = isOrderDetails ? order.restaurant : restaurant;
  const merchantName = utils.helpers.removeWhiteSpace(merchant.name);

  const branchName = isOrderDetails
    ? order.restaurant.branch.name
    : Object.values(restaurant.branches)[0].name;

  const time = isOrderDetails ? order.created_at : Number(moment().format('x'));

  const deliveryTime = isOrderDetails
    ? order.cooking_duration + 15
    : restaurant.cooking_duration;

  const etaTime = moment(time).add(deliveryTime, 'minutes').format('hh:mm');
  const timePeriod = moment(time).add(deliveryTime, 'minutes').format('A');

  const renderRightSide = () => {
    if (isOrderDetails) {
      return (
        <View style={styles.lottieWrapper}>
          <LottieView
            style={styles.lottie}
            autoPlay
            source={require('../../../assets/animation/order-delivered.json')}
          />
        </View>
      );
    }

    return (
      <View style={styles.clockWrapper}>
        <View style={styles.row}>
          <MCIcon
            name="clock-fast"
            color={utils.colors.blue}
            size={55}
            style={{marginRight: 3}}
          />
          <Text style={[styles.text, {fontSize: 14, alignSelf: 'center'}]}>
            ASAP
          </Text>
        </View>
        <TouchableOpacity style={styles.button} activeOpacity={0.7}>
          <Text style={[styles.text, {fontSize: 12, alignSelf: 'center'}]}>
            Change delivery time
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={[styles.wrapper, isOrderDetails && {paddingBottom: 15}]}>
      <View style={styles.sectionWrapper}>
        <View>
          <View style={styles.headlineWrapper}>
            <Text style={[styles.text]}>{merchantName}</Text>
            <Text
              style={[styles.text, {fontSize: 14, color: utils.colors.black}]}>
              {branchName}
            </Text>
          </View>

          <View>
            <View style={styles.row}>
              <Text
                style={[styles.text, {fontSize: 25, alignSelf: 'flex-start'}]}>
                {utils.helpers.removeLeadZeroNumber(etaTime)}
              </Text>
              <Text
                style={[
                  styles.text,
                  {
                    fontSize: 17,
                    marginLeft: 4,
                    marginBottom: 2,
                    alignSelf: 'flex-end',
                  },
                ]}>
                {timePeriod}
              </Text>
            </View>
            <Text
              style={[styles.text, {fontSize: 14, color: utils.colors.black}]}>
              Estimate Arrival
            </Text>
          </View>
        </View>

        {renderRightSide()}
      </View>

      {isOrderDetails ? (
        <View style={styles.statusWrapper}>
          <View style={styles.line} />

          <View style={styles.circleWrapper}>
            <View style={styles.circle}>
              <MCIcon
                name="clock-time-five-outline"
                size={13}
                color={utils.colors.white}
              />
            </View>
            <Text
              style={[styles.text, {fontSize: 12, color: utils.colors.border}]}>
              Placed
            </Text>
          </View>

          <View style={styles.circleWrapper}>
            <View style={styles.circle}>
              <MCIcon
                name="silverware-fork-knife"
                size={14}
                color={utils.colors.white}
              />
            </View>
            <Text
              style={[styles.text, {fontSize: 12, color: utils.colors.border}]}>
              Preparing
            </Text>
          </View>

          <View style={styles.circleWrapper}>
            <View style={styles.circle}>
              <IIcon name="bicycle" size={15} color={utils.colors.white} />
            </View>
            <Text
              style={[styles.text, {fontSize: 12, color: utils.colors.border}]}>
              Delivering
            </Text>
          </View>

          <View style={styles.circleWrapper}>
            <View style={styles.circle}>
              <MCIcon
                name="check-circle"
                size={15}
                color={utils.colors.white}
              />
            </View>
            <Text
              style={[styles.text, {fontSize: 12, color: utils.colors.yellow}]}>
              Delivered
            </Text>
          </View>
        </View>
      ) : null}
    </View>
  );
};
