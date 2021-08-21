import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import FontAwsomeIcon from 'react-native-vector-icons/FontAwesome';

import utils from '../utils';

const styles = StyleSheet.create({
  wrapper: {
    height: 35,
    borderRadius: 50,
    flexDirection: 'row',
    marginHorizontal: 15,
    backgroundColor: utils.colors.grey,
  },
  input: {
    flex: 1,
    padding: 0,
    fontSize: 13,
    marginLeft: 7,
  },
  icon: {
    marginLeft: 15,
    alignSelf: 'center',
    color: utils.colors.blue,
  },
});

export default (props) => {
  const {placeholder, style} = props;

  return (
    <View style={[styles.wrapper, style]}>
      <FontAwsomeIcon name="search" size={14} style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        autoCapitalize="none"
      />
    </View>
  );
};
