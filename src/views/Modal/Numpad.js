/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Navigator from '../../navigation/screen';
import * as Animatable from 'react-native-animatable';

import utils from '../../utils';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  space: {flex: 1},
  wrapper: {
    paddingTop: 20,
    paddingBottom: 5,
    borderTopLeftRadius: 17,
    borderTopRightRadius: 17,
    backgroundColor: utils.colors.grey,
  },
  row: {
    paddingBottom: 25,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  button: {
    paddingHorizontal: 25,
    justifyContent: 'center',
  },
  text: {
    fontSize: 23,
    fontWeight: 'bold',
    color: utils.colors.black,
  },
});

export default class Numpad extends React.PureComponent {
  popUpRef = React.createRef();

  onMounted = (ref) => {
    const {onMounted} = this.props;

    this.popUpRef = ref;

    if (onMounted) {
      onMounted(this);
    }
  };

  onClose = async () => {
    try {
      await this.popUpRef.fadeOutDown(300);

      Navigator.dismissOverLay();
    } catch (error) {
      //
    }
  };

  onPress = (num) => {
    const {onChangeText} = this.props;

    onChangeText(num);
  };

  onDelete = () => {
    const {onDelete} = this.props;

    onDelete();
  };

  render() {
    return (
      <Animatable.View
        duration={300}
        animation="fadeInUp"
        ref={this.onMounted}
        style={[styles.container, utils.shadows.bottomBar]}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={this.onClose}
          style={styles.space}
        />

        <View style={styles.wrapper}>
          <View style={styles.row}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => this.onPress(1)}
              hitSlop={{top: 15, bottom: 15, left: 25, right: 25}}
              style={styles.button}>
              <Text style={styles.text}>1</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => this.onPress(2)}
              hitSlop={{top: 15, bottom: 15, left: 25, right: 25}}
              style={styles.button}>
              <Text style={styles.text}>2</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => this.onPress(3)}
              hitSlop={{top: 15, bottom: 15, left: 25, right: 25}}
              style={styles.button}>
              <Text style={styles.text}>3</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.row}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => this.onPress(4)}
              hitSlop={{top: 15, bottom: 15, left: 25, right: 25}}
              style={styles.button}>
              <Text style={styles.text}>4</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => this.onPress(5)}
              hitSlop={{top: 15, bottom: 15, left: 25, right: 25}}
              style={styles.button}>
              <Text style={styles.text}>5</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => this.onPress(6)}
              hitSlop={{top: 15, bottom: 15, left: 25, right: 25}}
              style={styles.button}>
              <Text style={styles.text}>6</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.row}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => this.onPress(7)}
              hitSlop={{top: 15, bottom: 15, left: 25, right: 25}}
              style={styles.button}>
              <Text style={styles.text}>7</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => this.onPress(8)}
              hitSlop={{top: 15, bottom: 15, left: 25, right: 25}}
              style={styles.button}>
              <Text style={styles.text}>8</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => this.onPress(9)}
              hitSlop={{top: 15, bottom: 15, left: 25, right: 25}}
              style={styles.button}>
              <Text style={styles.text}>9</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.row}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={this.onClose}
              hitSlop={{top: 15, bottom: 15, left: 25, right: 25}}
              style={[styles.button, {paddingHorizontal: 10}]}>
              <Text style={[styles.text, {fontSize: 18}]}>Close</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => this.onPress(0)}
              hitSlop={{top: 15, bottom: 15, left: 25, right: 25}}
              style={styles.button}>
              <Text style={styles.text}>0</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={this.onDelete}
              hitSlop={{top: 15, bottom: 15, left: 25, right: 25}}
              style={styles.button}>
              <MCIcon name="backspace" size={20} />
            </TouchableOpacity>
          </View>
        </View>
      </Animatable.View>
    );
  }
}
