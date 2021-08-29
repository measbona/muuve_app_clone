import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import utils from '../../../utils';

const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: 15,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    backgroundColor: utils.colors.white,
  },
  iconWrapper: {
    width: 20,
    height: 20,
    marginRight: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowWrapper: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  text: {
    fontSize: 15,
    fontWeight: 'bold',
    color: utils.colors.black,
  },
});

export default ({name, icon, iconName, iconSize, value, onPress, logout}) => {
  const Icon = icon;

  return (
    <TouchableOpacity
      style={styles.wrapper}
      activeOpacity={0.7}
      onPress={onPress}>
      <View style={styles.rowWrapper}>
        <View style={styles.iconWrapper}>
          <Icon
            name={iconName}
            size={iconSize}
            color={logout && utils.colors.red}
          />
        </View>
        <Text style={[styles.text, logout && {color: utils.colors.red}]}>
          {name}
        </Text>
      </View>

      {value && (
        <Text style={[styles.text, {color: utils.colors.blue}]}>{value}</Text>
      )}
    </TouchableOpacity>
  );
};
