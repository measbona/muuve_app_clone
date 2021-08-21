/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {get} from 'lodash';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import utils from '../../../utils';

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 15,
    borderRadius: 17,
    flexDirection: 'row',
    backgroundColor: utils.colors.white,
  },
  merchantLogo: {
    width: 85,
    height: 85,
    borderRadius: 17,
    backgroundColor: utils.colors.grey,
  },
  content: {
    flex: 1,
    paddingVertical: 5,
    marginHorizontal: 8,
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 12,
    marginBottom: 2,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rating: {
    alignSelf: 'flex-end',
    flexDirection: 'row',
  },
  deliveryFee: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  space: {marginHorizontal: 4},
});

export default class Card extends React.PureComponent {
  render() {
    const {onPress, restaurant} = this.props;

    const reviewer = get(restaurant, 'reviewers', 0);
    const ratingCount = get(restaurant, 'rating_count', 0);
    const rating = Math.floor(ratingCount / reviewer);

    return (
      <TouchableOpacity
        style={styles.wrapper}
        activeOpacity={0.5}
        onPress={onPress}>
        <Image
          style={styles.merchantLogo}
          source={{uri: restaurant.images.logo}}
        />

        <View style={styles.content}>
          <View style={styles.row}>
            <View>
              <Text style={[styles.text, {fontSize: 14}]}>
                {restaurant.name.replace(/^ /g, '')}
              </Text>
              <Text style={[styles.text, {color: utils.colors.border}]}>
                Snack, Juice, Noodle, Tea
              </Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.rating}>
              <MCIcon
                name="star"
                color={utils.colors.yellow}
                size={16}
                style={{marginRight: 2}}
              />
              <Text
                style={[
                  styles.text,
                  {color: utils.colors.blue},
                ]}>{`${rating}/${ratingCount}`}</Text>
            </View>
            <View style={styles.deliveryFee}>
              <MCIcon
                name="motorbike"
                color={utils.colors.blue}
                size={18}
                style={{marginBottom: 2}}
              />
              <Text style={[styles.text, {color: utils.colors.blue}]}>
                $0.75
              </Text>
              <View style={styles.space} />
              <MCIcon
                name="clock-time-five-outline"
                color={utils.colors.blue}
                size={15}
              />
              <Text
                style={[
                  styles.text,
                  {color: utils.colors.blue},
                ]}>{`~${restaurant.cooking_duration} min`}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
