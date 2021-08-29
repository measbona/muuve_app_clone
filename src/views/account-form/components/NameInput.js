/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';

import utils from '../../../utils';

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 5,
  },
  titleWrapper: {
    flexDirection: 'row',
  },
  text: {
    fontSize: 14,
    fontWeight: 'bold',
    color: utils.colors.black,
  },
  textInputWrapper: {
    minHeight: 40,
    borderRadius: 17,
    marginVertical: 10,
    backgroundColor: utils.colors.grey,
  },
  textInput: {
    flex: 1,
    fontSize: 14,
    marginLeft: 15,
    fontWeight: 'bold',
  },
});

export default ({name, placeholder, onChange, value}) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.titleWrapper}>
        <Text style={styles.text}>{name}</Text>
        <Text style={[styles.text, {color: utils.colors.red, marginLeft: 5}]}>
          *
        </Text>
      </View>

      <View style={styles.textInputWrapper}>
        <TextInput
          style={styles.textInput}
          value={value}
          placeholder={placeholder}
          onChangeText={(text) => onChange(text)}
        />
      </View>
    </View>
  );
};
