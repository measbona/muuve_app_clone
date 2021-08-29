import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import utils from '../../../utils';

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
  },
  deliveryFee: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  preparationTime: {
    marginLeft: 5,
    alignItems: 'center',
    flexDirection: 'row',
  },
  text: {
    fontSize: 12,
    fontWeight: 'bold',
    color: utils.colors.blue,
  },
});

export default ({deliveryFee}) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.deliveryFee}>
        <MIcon name="motorcycle" size={20} color={utils.colors.blue} />
        <Text style={styles.text}>{`$${deliveryFee}`}</Text>
      </View>
      <View style={styles.preparationTime}>
        <MCIcon
          name="clock-time-five-outline"
          size={15}
          color={utils.colors.blue}
        />
        <Text style={styles.text}>~32 min</Text>
      </View>
    </View>
  );
};
