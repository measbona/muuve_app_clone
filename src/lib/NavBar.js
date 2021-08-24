import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import MTIcon from 'react-native-vector-icons/MaterialIcons';
import * as Navigator from '../navigation/screen';

import utils from '../utils';

const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: 15,
    flexDirection: 'row',
    borderBottomLeftRadius: 17,
    borderBottomRightRadius: 17,
  },
  title: {
    fontSize: 17,
    marginLeft: 10,
    fontWeight: 'bold',
  },
  icon: {marginLeft: 15},
});

export default (props) => {
  const {
    style,
    title,
    componentId,
    shadow = true,
    popToRoot = false,
    noneNavigate = false,
    navigateColor = utils.colors.black,
  } = props;

  return (
    <View style={[styles.wrapper, style, shadow && utils.shadows.lightShadow]}>
      {!noneNavigate ? (
        <MTIcon
          name="arrow-back"
          size={25}
          color={navigateColor}
          onPress={() =>
            popToRoot
              ? Navigator.popToRoot(componentId)
              : Navigator.popBack(componentId)
          }
          style={styles.icon}
        />
      ) : null}
      {title ? <Text style={styles.title}>{title}</Text> : null}
    </View>
  );
};
