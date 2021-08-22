import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {showToast} from '../../../navigation/screen';
import Clipboard from '@react-native-community/clipboard';

import utils from '../../../utils';

const styles = StyleSheet.create({
  wrapper: {
    minHeight: 40,
    borderRadius: 17,
    marginBottom: 15,
    flexDirection: 'row',
    backgroundColor: utils.colors.grey,
  },
  linkWrapper: {
    flex: 7,
    paddingLeft: 15,
    justifyContent: 'center',
  },
  text: {
    fontSize: 14,
    fontWeight: 'bold',
    color: utils.colors.black,
  },
  button: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 10,
    borderTopRightRadius: 17,
    justifyContent: 'center',
    borderBottomRightRadius: 17,
    backgroundColor: utils.colors.yellow,
  },
});

export default ({url}) => {
  const linkCopy = () => {
    Clipboard.setString(url);

    showToast({message: 'Copied'});
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.linkWrapper}>
        <Text style={[styles.text]} numberOfLines={1}>
          {url}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.7}
        onPress={() => linkCopy()}>
        <Text style={styles.text}>COPY</Text>
      </TouchableOpacity>
    </View>
  );
};
