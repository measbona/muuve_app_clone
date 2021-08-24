import React from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import MIcon from 'react-native-vector-icons/MaterialIcons';

import utils from '../../../utils';

const styles = StyleSheet.create({
  scrollView: {
    paddingLeft: 15,
    flexDirection: 'row',
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
});

const categories = ["Editor's Choice", 'Drink', 'Snack', 'Others'];

export default (props) => {
  return (
    <View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}>
        <TouchableOpacity style={styles.button} activeOpacity={0.7}>
          <Text style={styles.text}>Menu</Text>
          <MIcon
            name="keyboard-arrow-down"
            color={utils.colors.blue}
            size={20}
          />
        </TouchableOpacity>
        {categories.map((category, key) => {
          return (
            <TouchableOpacity
              style={styles.button}
              key={key}
              activeOpacity={0.7}>
              <Text style={styles.text}>{category}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};
