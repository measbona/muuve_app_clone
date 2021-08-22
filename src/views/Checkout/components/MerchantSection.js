/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import moment from 'moment';
import MDIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import utils from '../../../utils';

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 7,
    paddingVertical: 15,
    flexDirection: 'row',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    backgroundColor: utils.colors.white,
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
});

export default ({restaurant}) => {
  const merchantName = utils.helpers.removeWhiteSpace(restaurant.name);
  const branchName = Object.values(restaurant.branches)[0].name;

  const etaTime = moment().add(25, 'minutes').format('hh:mm');
  const timePeriod = moment().add(25, 'minutes').format('A');

  return (
    <View style={styles.wrapper}>
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
                  alignSelf: 'flex-end',
                  marginBottom: 2,
                  marginLeft: 4,
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

      <View style={styles.clockWrapper}>
        <View style={styles.row}>
          <MDIcon
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
    </View>
  );
};
