import React from 'react';
import {View, Text, TextInput, Image, StyleSheet} from 'react-native';

import utils from '../../../utils';

const styles = StyleSheet.create({
  wrapper: {
    height: 45,
    borderRadius: 17,
    marginVertical: 10,
    flexDirection: 'row',
    backgroundColor: utils.colors.grey,
  },
  headWrapper: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  image: {
    width: 27,
    height: 17,
    marginLeft: 20,
  },
  text: {
    fontSize: 14,
    marginLeft: 10,
    fontWeight: 'bold',
  },
  textInput: {
    flex: 1,
    fontSize: 14,
    marginLeft: 10,
    fontWeight: 'bold',
  },
});

export default (props) => {
  const {onChangeText} = props;

  return (
    <View style={styles.wrapper}>
      <View style={styles.headWrapper}>
        <Image
          style={styles.image}
          source={require('../../../assets/icons/flag_icon.png')}
        />
        <Text style={styles.text}>+855</Text>
      </View>

      <TextInput
        caretHidden
        maxLength={10}
        style={styles.textInput}
        keyboardType="number-pad"
        placeholder="Enter phone number"
        onChangeText={(num) => onChangeText(num)}
      />
    </View>
  );
};
