import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';

import utils from '../../../utils';

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 20,
  },
  text: {
    fontSize: 14,
    fontWeight: 'bold',
    color: utils.colors.black,
  },
  dateBirthWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textInputWrapper: {
    flex: 1,
    minHeight: 40,
    borderRadius: 17,
    marginVertical: 10,
    backgroundColor: utils.colors.grey,
  },
  skeleton: {
    marginHorizontal: 3,
  },
  textInput: {
    flex: 1,
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default ({
  name,
  onDayChange,
  onMonthChange,
  onYearChange,
  day,
  month,
  year,
}) => {
  return (
    <View style={styles.wrapper}>
      <View>
        <Text style={styles.text}>{name}</Text>
      </View>
      <View style={styles.dateBirthWrapper}>
        <View style={styles.textInputWrapper}>
          <TextInput
            value={day}
            textAlign="center"
            placeholder="Day"
            style={styles.textInput}
            keyboardType="number-pad"
            onChangeText={(text) => onDayChange(text)}
          />
        </View>

        <View style={styles.skeleton} />

        <View style={styles.textInputWrapper}>
          <TextInput
            value={month}
            textAlign="center"
            placeholder="Month"
            style={styles.textInput}
            keyboardType="default"
            onChangeText={(text) => onMonthChange(text)}
          />
        </View>

        <View style={styles.skeleton} />

        <View style={styles.textInputWrapper}>
          <TextInput
            value={year}
            textAlign="center"
            placeholder="Year"
            style={styles.textInput}
            keyboardType="number-pad"
            onChangeText={(text) => onYearChange(text)}
          />
        </View>
      </View>
    </View>
  );
};
