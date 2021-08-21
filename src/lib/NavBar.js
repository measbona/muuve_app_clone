import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import MTIcon from 'react-native-vector-icons/MaterialIcons';
import * as Navigator from '../navigation/screen';

import utils from '../utils';

const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: 20,
    flexDirection: 'row',
    borderBottomLeftRadius: 17,
    borderBottomRightRadius: 17,
  },
  title: {
    fontSize: 18,
    marginLeft: 10,
    fontWeight: 'bold',
  },
  icon: {marginLeft: 15},
});

export default (props) => {
  const {style, title, componentId} = props;

  return (
    <View style={[styles.wrapper, style]}>
      <MTIcon
        name="arrow-back"
        size={25}
        color={utils.colors.white}
        onPress={() => Navigator.popBack(componentId)}
        style={styles.icon}
      />
      {title ? <Text style={styles.title}>{title}</Text> : null}
    </View>
  );
};
