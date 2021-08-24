/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {connect} from 'react-redux';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import {map, orderBy} from 'lodash';
import * as Navigator from '../../navigation/screen';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import utils from '../../utils';

import NavBar from '../../lib/NavBar';
import Loading from '../../lib/Loading';
import OrderListItem from './components/OrderListItem';

import OrderActions from '../../redux/OrderRedux';

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    backgroundColor: utils.colors.lightGrey,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    fontSize: 17,
    fontWeight: 'bold',
    color: utils.colors.blue,
  },
  scrollView: {flex: 1},
  wrapper: {alignItems: 'center'},
});

class OrderHistory extends React.Component {
  componentDidMount() {
    Navigator.bindComponent(this);
  }

  componentDidAppear() {
    const {getOrderHistory, loaded} = this.props;

    if (!loaded) {
      getOrderHistory();
    }
  }

  onOrderPress = (order) => {
    const {componentId} = this.props;

    Navigator.goToOrderDetails(componentId, {
      order,
    });
  };

  renderNoOrders = () => {
    return (
      <View style={styles.wrapper}>
        <MCIcon
          name="receipt"
          size={55}
          color={utils.colors.yellow}
          style={{marginTop: 30, paddingVertical: 10}}
        />
        <View style={styles.wrapper}>
          <Text style={[styles.text, {paddingBottom: 5}]}>
            You haven't made any order yet
          </Text>
          <Text
            style={[styles.text, {fontSize: 12, color: utils.colors.black}]}>
            Order your favorite dishes with us now
          </Text>
        </View>
      </View>
    );
  };

  renderOrders = () => {
    const {orders} = this.props;

    const sortedOrders = orderBy(orders, 'created_at', 'desc');

    if (!orders) {
      return this.renderNoOrders();
    }

    return map(sortedOrders, (order, key) => (
      <OrderListItem
        key={key}
        order={order}
        onPress={() => this.onOrderPress(order)}
      />
    ));
  };

  render() {
    const {componentId, loaded} = this.props;

    return (
      <View style={styles.conatiner}>
        <NavBar
          noneNavigate
          title="Order"
          componentId={componentId}
          style={{backgroundColor: utils.colors.yellow, paddingLeft: 10}}
        />

        {loaded ? (
          <ScrollView
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}>
            {this.renderOrders()}
          </ScrollView>
        ) : (
          <View style={styles.loading}>
            <Loading style={{alignSelf: 'center'}} />
          </View>
        )}
      </View>
    );
  }
}

const mapState = ({order}) => ({
  orders: order.data,
  loaded: order.loaded,
});

const mapDispatch = {
  getOrderHistory: OrderActions.getOrderHistory,
};

export default connect(mapState, mapDispatch)(OrderHistory);
