/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {dismissOverLay} from '../../navigation/screen';

import utils from '../../utils';

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  modal: {
    borderRadius: 17,
    paddingVertical: 15,
    backgroundColor: utils.colors.white,
    width: utils.device.screenWidth - 32,
  },
  headline: {alignItems: 'center'},
  text: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  border: {
    borderWidth: 1,
    marginVertical: 10,
    alignSelf: 'center',
    borderColor: utils.colors.grey,
    width: utils.device.screenWidth - 64,
  },
  content: {
    alignItems: 'center',
    paddingBottom: 25,
    marginHorizontal: 20,
  },
  buttonWrapper: {
    flexDirection: 'row',
    marginHorizontal: 15,
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    alignItems: 'center',
    borderRadius: 15,
    paddingVertical: 10,
    backgroundColor: utils.colors.yellow,
  },
});

export default class ModalChoice extends React.PureComponent {
  containerRef = React.createRef();

  onCancelButton = async () => {
    await this.containerRef.fadeOut(300);
    await dismissOverLay();
  };

  onConfirm = async () => {
    const {onPress} = this.props;

    await this.containerRef.fadeOut(300);
    await dismissOverLay();

    onPress();
  };

  render() {
    const {headline, description, no, yes} = this.props;

    return (
      <Animatable.View
        style={styles.conatiner}
        ref={(ref) => (this.containerRef = ref)}
        animation="fadeIn"
        duration={300}>
        <View style={styles.modal}>
          <View style={styles.headline}>
            <Text style={[styles.text, {color: utils.colors.yellow}]}>
              {headline}
            </Text>
          </View>

          <View style={styles.border} />

          <View style={styles.content}>
            <Text style={[styles.text, {fontSize: 14, textAlign: 'center'}]}>
              {description}
            </Text>
          </View>

          <View style={styles.buttonWrapper}>
            <TouchableOpacity
              style={[
                styles.button,
                {backgroundColor: utils.colors.blue, marginRight: 10},
              ]}
              activeOpacity={0.5}
              onPress={this.onCancelButton}>
              <Text
                style={[
                  styles.text,
                  {fontSize: 14, color: utils.colors.white},
                ]}>
                {no}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, {flex: 2}]}
              activeOpacity={0.5}
              onPress={this.onConfirm}>
              <Text
                style={[
                  styles.text,
                  {fontSize: 14, color: utils.colors.black},
                ]}>
                {yes}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Animatable.View>
    );
  }
}
