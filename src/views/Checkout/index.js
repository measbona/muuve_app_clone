/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {connect} from 'react-redux';
import {View, ScrollView, StyleSheet} from 'react-native';
import {reduce, size, filter, every} from 'lodash';
import * as Navigator from '../../navigation/screen';
import * as Animatable from 'react-native-animatable';
import firebase from '@react-native-firebase/app';

import utils from '../../utils';
import Modules from '../../modules';

import NavBar from '../../lib/NavBar';
import Loading from '../../lib/Loading';
import PlaceOrder from './components/PlaceOrder';
import ItemSection from './components/ItemSection';
import PaymentSection from './components/PaymentSection';
import MerchantSection from './components/MerchantSection';
import PromocodeSection from './components/PromocodeSection';
import PaymentOptionSection from './components/PaymentOptionSection';
import DeliveryLocationSection from './components/DeliveryLocationSection';

import CartActions from '../../redux/CartRedux';
import OrderActions from '../../redux/OrderRedux';

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    backgroundColor: utils.colors.lightGrey,
  },
  content: {flex: 1},
  loading: {
    flex: 1,
    justifyContent: 'center',
  },
});

class Checkout extends React.PureComponent {
  state = {
    mounted: false,
    loading: false,
  };

  componentDidMount() {
    Navigator.bindComponent(this);
  }

  componentDidAppear() {
    this.setState({mounted: true});
  }

  validate = () => {
    const {groupOrder, profile} = this.props;

    const participants = filter(
      groupOrder.joined_users,
      (user, key) => profile.uid !== key,
    );

    const isOrderReady = every(participants, ['ready', true]);

    return new Promise((resolve, reject) => {
      if (!isOrderReady) {
        return reject(
          Navigator.showModalChoice({
            headline: 'Confirmation',
            description:
              'We notice that some participants not yet ready to order.Do you want to continue?',
            no: 'CANCEL',
            yes: 'CONTINUE',
            onPress: this.onPlaceOrder,
          }),
        );
      }

      return resolve(true);
    });
  };

  onPlaceOrder = async () => {
    const {
      orders,
      profile,
      setOrder,
      groupOrder,
      componentId,
      isStartGroupOrder,
      removeGroupOrderData,
    } = this.props;

    const orderRef = firebase
      .database()
      .ref(`/deliveree_orders/${profile.phone_number}`);

    const orderKey = orderRef.push().key;

    try {
      await this.validate();
      this.setState({loading: true});

      const order = await Modules.Order.createCheckOutOrder({
        ...this,
        orderKey,
      });

      await orderRef.update({[orderKey]: order});
      setOrder({...orders, [orderKey]: order});

      if (isStartGroupOrder) {
        removeGroupOrderData(groupOrder.group_key);
      }

      this.setState({loading: false});

      await Navigator.showModalSuccess();
      Navigator.goToOrderDetails(componentId, {order: order});
    } catch (error) {
      this.setState({loading: false});

      Navigator.showModalNotice({
        headline: 'Oops!!',
        description:
          'Something went wrong while creating order.\nPlease try again.',
        buttonName: 'Continue',
      });
    }
  };

  onGroupOrderPress = () => {
    const {componentId} = this.props;

    Navigator.goToGroupOrderCart(componentId);
  };

  onDecrease = (item) => {
    const {componentId, cart, setCartKey, setCartItem} = this.props;
    let newSelectedItems = null;

    if (item.quantity === 1) {
      newSelectedItems = reduce(
        cart,
        (result, remainItem) => {
          if (remainItem.key !== item.key) {
            result[remainItem.key] = {
              key: remainItem.key,
              name: remainItem.name,
              price: remainItem.price,
              quantity: remainItem.quantity,
            };
          }

          return result;
        },
        {},
      );
    } else {
      newSelectedItems = reduce(
        cart,
        (result, remainItem) => {
          if (remainItem.key === item.key) {
            result[remainItem.key] = {
              key: remainItem.key,
              name: remainItem.name,
              price: remainItem.price,
              quantity: remainItem.quantity - 1,
            };
          } else {
            result[remainItem.key] = {
              key: remainItem.key,
              name: remainItem.name,
              price: remainItem.price,
              quantity: remainItem.quantity,
            };
          }

          return result;
        },
        {},
      );
    }

    if (size(newSelectedItems) === 0) {
      setCartKey(null);

      return Navigator.showModalNotice({
        headline: 'Noticed',
        description: 'Your cart is empty',
        buttonName: 'Back',
        onPress: () => {
          setCartItem(newSelectedItems);
          Navigator.popBack(componentId);
        },
      });
    }

    setCartItem(newSelectedItems);
  };

  render() {
    const {mounted, loading} = this.state;
    const {
      cart,
      profile,
      restaurant,
      groupOrder,
      componentId,
      isStartGroupOrder,
    } = this.props;

    return (
      <View style={styles.conatiner}>
        <NavBar
          title="Checkout"
          componentId={componentId}
          style={{backgroundColor: utils.colors.yellow}}
        />

        {mounted ? (
          <Animatable.View
            style={styles.content}
            animation="fadeIn"
            duration={300}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <MerchantSection restaurant={restaurant} />
              <DeliveryLocationSection />
              <ItemSection
                cart={cart}
                profile={profile}
                groupOrder={groupOrder}
                onDecrease={this.onDecrease}
                onGroupOrderPress={this.onGroupOrderPress}
                isStartGroupOrder={isStartGroupOrder}
              />
              <PaymentOptionSection />
              <PromocodeSection />
              <PaymentSection cart={cart} />
            </ScrollView>
            <PlaceOrder loading={loading} onPress={this.onPlaceOrder} />
          </Animatable.View>
        ) : (
          <View style={styles.loading}>
            <Loading color="yellow" style={{alignSelf: 'center'}} />
          </View>
        )}
      </View>
    );
  }
}

const mapState = ({order, cart, profile}) => ({
  cart: cart.data,
  orders: order.data,
  profile: profile.data,
  groupOrder: order.groupOrderData,
  isStartGroupOrder: order.groupOrderEnabled,
});

const mapDispatch = {
  setCartKey: CartActions.setCartKey,
  setCartItem: CartActions.setCartItem,
  setOrder: OrderActions.setOrderHistory,
  removeGroupOrderData: OrderActions.removeGroupOrderData,
};

export default connect(mapState, mapDispatch)(Checkout);
