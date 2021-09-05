/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {find, size, get} from 'lodash';
import MIcon from 'react-native-vector-icons/MaterialIcons';

import utils from '../../../utils';
import Colors from '../../../utils/colors';

import Loading from '../../../lib/Loading';

const styles = StyleSheet.create({
  mainWrapper: {backgroundColor: utils.colors.white},
  wrapper: {
    margin: 15,
    borderRadius: 17,
    paddingHorizontal: 15,
    backgroundColor: utils.colors.white,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  leftSideWrapper: {
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rightSideWrapper: {
    paddingBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    borderRadius: 50,
    paddingVertical: 5,
    alignSelf: 'center',
    paddingHorizontal: 20,
    backgroundColor: utils.colors.grey,
  },
  text: {
    fontSize: 15,
    fontWeight: 'bold',
    color: utils.colors.blue,
  },
});

export default (props) => {
  const {loading, groupOrder, onInvite, onEndSession} = props;

  const restaurantName = get(groupOrder, 'restaurant.name', '');

  const initiator = find(groupOrder.joined_users, (user) => user.host === true);
  const initiatorName = get(initiator, 'name', '');

  const participantCount = size(groupOrder.joined_users);
  const {total: itemCount, subTotal} = utils.helpers.countGroupOrderItem(
    groupOrder.items,
  );

  return (
    <View style={styles.mainWrapper}>
      <View style={[styles.wrapper, utils.shadows.logoutShadow]}>
        <View style={styles.leftSideWrapper}>
          <View style={styles.row}>
            <MIcon name="group" size={40} color={Colors.blue} />
            <View style={{marginLeft: 10}}>
              <Text style={styles.text}>
                {utils.helpers.removeWhiteSpace(restaurantName)}
              </Text>
              <Text
                style={[
                  styles.text,
                  {fontSize: 12, color: utils.colors.border},
                ]}>
                {`Host by ${initiatorName}`}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.7}
            onPress={onInvite}>
            <MIcon name="person-add" size={20} color={Colors.blue} />
          </TouchableOpacity>
        </View>

        <View style={styles.rightSideWrapper}>
          <View>
            <Text
              style={[styles.text, {fontSize: 12, color: utils.colors.border}]}>
              {`${itemCount} Items | ${participantCount} Participants`}
            </Text>
            <Text
              style={[styles.text, {fontSize: 12, color: utils.colors.border}]}>
              {`Total: $${subTotal}`}
            </Text>
          </View>

          <TouchableOpacity
            disabled={loading}
            activeOpacity={0.7}
            style={styles.button}
            onPress={onEndSession}>
            {loading ? (
              <Loading style={{width: 20, height: 20}} />
            ) : (
              <MIcon name="exit-to-app" size={20} color={Colors.blue} />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
