import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {map, get} from 'lodash';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import utils from '../../../utils';

import Item from '../../merchat-details/components/Item';

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 7,
    paddingBottom: 20,
    backgroundColor: utils.colors.white,
  },
  headlineWrapper: {
    marginTop: 15,
    marginBottom: 20,
    flexDirection: 'row',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  icon: {
    marginLeft: 5,
    alignSelf: 'center',
  },
  nameWrapper: {
    flexDirection: 'row',
  },
  text: {
    fontSize: 17,
    fontWeight: 'bold',
    color: utils.colors.blue,
  },
  amountWrapper: {
    flexDirection: 'row',
  },
  divider: {
    borderWidth: 1,
    marginVertical: 15,
    marginHorizontal: 20,
    borderColor: utils.colors.grey,
  },
});

export default ({user, items, onPress, isCurrentUser}) => {
  const itemCount = utils.helpers.countParticipantItem(items);
  const subTotal = utils.helpers.sumCartTotal(items);
  const lastItem = Object.values(items).pop();

  const userName = get(user, 'name', 'N/A');
  const userReady = get(user, 'ready', false);
  const isHoster = get(user, 'host', false);

  const disabled = !isCurrentUser;

  return (
    <View style={styles.wrapper}>
      <View style={styles.headlineWrapper}>
        <View style={styles.nameWrapper}>
          <Text style={styles.text}>
            {isCurrentUser ? 'Your Order' : userName}
          </Text>
          {!isHoster && userReady ? (
            <MCIcon
              size={18}
              name="check-circle"
              style={styles.icon}
              color={utils.colors.green}
            />
          ) : null}
        </View>

        <View style={styles.amountWrapper}>
          <Text
            style={[
              styles.text,
              {color: utils.colors.black},
            ]}>{`${itemCount} x `}</Text>
          <Text style={styles.text}>{`$${subTotal}`}</Text>
        </View>
      </View>

      {map(items, (item, key) => {
        const isLastItem = lastItem.key === key;

        return (
          <View key={key}>
            <Item
              item={item}
              isGroupOrderListing
              itemImage={item.thumb}
              onPress={() => onPress(item)}
              disabled={disabled}
            />
            {!isLastItem && <View style={styles.divider} />}
          </View>
        );
      })}
    </View>
  );
};
