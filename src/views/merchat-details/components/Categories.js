import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import utils from '../../../utils';

const styles = StyleSheet.create({
  wrapper: {
    minHeight: 50,
    marginLeft: 15,
    marginRight: 100,
    paddingBottom: 20,
  },
  text: {
    fontSize: 12,
    fontWeight: 'bold',
    color: utils.colors.border,
  },
});

export default ({}) => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.text} numberOfLines={2}>
        {
          'Drinks \u2022 Fast Food \u2022 Milk Tea \u2022 Pasta \u2022 Promotion \u2022 Asian Cusine \u2022 Anchor White'
        }
      </Text>
    </View>
  );
};
