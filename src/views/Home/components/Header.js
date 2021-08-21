import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import ADIcon from 'react-native-vector-icons/AntDesign';
import MIcon from 'react-native-vector-icons/MaterialIcons';

import utils from '../../../utils';

import SearchBar from '../../../lib/SearchBar';

const styles = StyleSheet.create({
  wrapper: {
    paddingBottom: 15,
    borderBottomLeftRadius: 17,
    borderBottomRightRadius: 17,
    backgroundColor: utils.colors.yellow,
  },
  locationWrapper: {
    paddingVertical: 12,
    flexDirection: 'row',
    marginHorizontal: 20,
    justifyContent: 'space-between',
  },
  labelName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: utils.colors.blue,
  },
  locationName: {
    fontSize: 12,
    color: utils.colors.black,
  },
  favoriteButton: {
    alignSelf: 'center',
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  column: {alignItems: 'center'},
  skeleton: {marginRight: 35},
  icon: {marginRight: 3},
});

export default class Header extends React.PureComponent {
  render() {
    const {onCartPress} = this.props;

    return (
      <View style={[styles.wrapper, utils.shadows.lightShadow]}>
        <View style={styles.locationWrapper}>
          <View style={styles.skeleton} />
          <View style={styles.column}>
            <View style={styles.row}>
              <MIcon name="my-location" size={17} style={styles.icon} />
              <Text style={styles.labelName}>Current Location</Text>
              <MIcon
                name="keyboard-arrow-down"
                color={utils.colors.blue}
                size={20}
              />
            </View>
            <Text style={styles.locationName} numberOfLines={1}>
              Phum Damnak Thum, Phnom Penh
            </Text>
          </View>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={onCartPress}
            style={styles.favoriteButton}
            hitSlop={{top: 12, bottom: 12, left: 12, right: 12}}>
            <ADIcon name="heart" size={25} color={utils.colors.red} />
          </TouchableOpacity>
        </View>

        <SearchBar placeholder="Search stores or dishes" />
      </View>
    );
  }
}
