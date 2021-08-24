/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  StyleSheet,
} from 'react-native';

import utils from '../../utils';

import Content from './components/Content';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerWrapper: {
    paddingTop: 20,
    alignItems: 'center',
    borderBottomLeftRadius: 17,
    borderBottomRightRadius: 17,
    backgroundColor: utils.colors.yellow,
  },
  row: {
    flexDirection: 'row',
  },
  footerWrapper: {
    paddingVertical: 20,
    alignItems: 'center',
    borderTopLeftRadius: 17,
    borderTopRightRadius: 17,
    backgroundColor: utils.colors.yellow,
  },
  text: {
    fontSize: 12,
    fontWeight: 'bold',
    color: utils.colors.black,
  },
  image: {
    width: 120,
    height: 120,
  },
});

export default class PhoneLogin extends React.PureComponent {
  render() {
    const {componentId} = this.props;
    const avoidProps = utils.device.isIOS
      ? {
          behavior: 'padding',
          style: {flex: 1},
        }
      : {
          behavior: 'height',
        };

    return (
      <View style={styles.container}>
        <View style={[styles.headerWrapper, utils.shadows.lightShadow]}>
          <Image
            style={styles.image}
            source={require('../../assets/images/muuve_logo.png')}
          />
        </View>

        <KeyboardAvoidingView style={{flex: 1}} {...avoidProps}>
          <Content componentId={componentId} />
        </KeyboardAvoidingView>

        <View style={[styles.footerWrapper, utils.shadows.bottomBar]}>
          <Text style={styles.text}>By continuing your agree to our</Text>
          <View style={styles.row}>
            <Text
              style={[
                styles.text,
                {color: utils.colors.blue, textDecorationLine: 'underline'},
              ]}
              activeOpacity={0.7}
              onPress={() => {}}>
              Terms of Service
            </Text>
            <Text style={styles.text}> and</Text>
            <Text
              style={[
                styles.text,
                {color: utils.colors.blue, textDecorationLine: 'underline'},
              ]}
              activeOpacity={0.7}
              onPress={() => {}}>
              {' '}
              Privacy Policy
            </Text>
          </View>
        </View>
      </View>
    );
  }
}
