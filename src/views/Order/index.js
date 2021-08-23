/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import * as Navigator from '../../navigation/screen';

import utils from '../../utils';

import NavBar from '../../lib/NavBar';
import OrderListItem from './components/OrderListItem';

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    backgroundColor: utils.colors.lightGrey,
  },
  scrollView: {
    flex: 1,
  },
});

export default class Order extends React.Component {
  onOrderPress = () => {
    const {componentId} = this.props;

    Navigator.goToOrderDetails(componentId);
  };

  render() {
    const {componentId} = this.props;

    return (
      <View style={styles.conatiner}>
        <NavBar
          noneNavigate
          title="Order"
          componentId={componentId}
          style={{backgroundColor: utils.colors.yellow, paddingLeft: 10}}
        />

        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}>
          <OrderListItem onPress={this.onOrderPress} />
        </ScrollView>
      </View>
    );
  }
}
