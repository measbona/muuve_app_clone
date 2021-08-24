import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import FAIcon from 'react-native-vector-icons/FontAwesome';

import utils from '../../../utils';

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  text: {
    fontSize: 12,
    marginLeft: 4,
    fontWeight: 'bold',
    color: utils.colors.blue,
  },
});

export default (props) => {
  return (
    <View style={styles.wrapper}>
      <FAIcon name="star" size={15} color={utils.colors.yellow} />
      <Text style={styles.text}>4.4/19</Text>
    </View>
  );
};
