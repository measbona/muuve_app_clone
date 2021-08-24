/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import * as Navigator from '../../../navigation/screen';

import utils from '../../../utils';

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    paddingVertical: 5.5,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 17,
    borderBottomRightRadius: 17,
    justifyContent: 'space-between',
    backgroundColor: utils.colors.yellow,
  },
  profileWrapper: {
    flexDirection: 'row',
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },
  nameWrapper: {
    marginLeft: 10,
  },
  text: {
    fontSize: 17,
    fontWeight: 'bold',
    color: utils.colors.black,
  },
});

export default class Header extends React.PureComponent {
  render() {
    const {componentId, user} = this.props;

    const userName = user && `${user.family_name} ${user.first_name}`;
    const phoneNumber = user && user.phone_number;

    return (
      <View style={styles.wrapper}>
        <View style={styles.profileWrapper}>
          <Image
            style={styles.image}
            source={require('../../../assets/images/user_placeholder.jpg')}
          />
          <View style={styles.nameWrapper}>
            <Text style={styles.text}>{userName}</Text>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => Navigator.goToAccountForm(componentId)}>
              <Text
                style={[styles.text, {fontSize: 14, color: utils.colors.blue}]}>
                View Account
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <Text style={styles.text}>{phoneNumber}</Text>
        </View>
      </View>
    );
  }
}
