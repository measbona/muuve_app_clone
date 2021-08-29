import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import MIcon from 'react-native-vector-icons/MaterialIcons';

import utils from '../../../utils';

const styles = StyleSheet.create({
  wrapper: {
    marginLeft: 16,
    marginBottom: 15,
    alignItems: 'flex-start',
  },
  button: {
    marginRight: 10,
    borderRadius: 50,
    paddingVertical: 7,
    flexDirection: 'row',
    paddingHorizontal: 15,
    backgroundColor: utils.colors.grey,
  },
  text: {
    fontSize: 14,
    fontWeight: 'bold',
    color: utils.colors.blue,
  },
  icon: {marginRight: 5},
});

export default (props) => {
  const {
    onPreview,
    onEndSession,
    isParticipant,
    onGroupOrderPress,
    isStartGroupOrder,
  } = props;

  const renderButtons = () => {
    if (!isStartGroupOrder && isParticipant) {
      return (
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.7}
          onPress={() => onGroupOrderPress()}>
          <MIcon
            name="group-add"
            size={20}
            color={utils.colors.blue}
            style={styles.icon}
          />
          <Text style={styles.text}>Group Order</Text>
        </TouchableOpacity>
      );
    } else if (isStartGroupOrder && !isParticipant) {
      return (
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.7}
          onPress={() => onEndSession()}>
          <MIcon
            name="exit-to-app"
            size={18}
            color={utils.colors.blue}
            style={styles.icon}
          />
          <Text style={styles.text}>End Session</Text>
        </TouchableOpacity>
      );
    } else if (isParticipant) {
      return (
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.7}
          onPress={() => onPreview()}>
          <MIcon
            name="format-list-bulleted"
            size={18}
            color={utils.colors.blue}
            style={styles.icon}
          />
          <Text style={styles.text}>Preview Order</Text>
        </TouchableOpacity>
      );
    }
  };

  return <View style={styles.wrapper}>{renderButtons()}</View>;
};
