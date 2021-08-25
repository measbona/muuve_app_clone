import React from 'react';
import {connect} from 'react-redux';
import {View, ScrollView, StyleSheet} from 'react-native';
import {reduce, size} from 'lodash';
import * as Navigator from '../../navigation/screen';
import * as Animatable from 'react-native-animatable';
import firebase from '@react-native-firebase/app';

import utils from '../../utils';
import Modules from '../../modules';

import NavBar from '../../lib/NavBar';
import PaymentSection from './components/PaymentSection';
import MerchantSection from './components/MerchantSection';
import PromocodeSection from './components/PromocodeSection';
import ItemSection from './components/ItemSection';
import PlaceOrder from './components/PlaceOrder';
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

  onPlaceOrderPress = () => {
    Navigator.showModalChoice({
      headline: 'Confirmation',
      description:
        'We notice that some participants not yet ready to order.Do you want to continue?',
      no: 'CANCEL',
      yes: 'CONTINUE',
      onPress: this.onPlaceOrder,
    });
  };

  onPlaceOrder = async () => {
    const {componentId, orders, profile, setOrder} = this.props;

    const orderRef = firebase
      .database()
      .ref(`/deliveree_orders/${profile.phone_number}`);

    const orderKey = orderRef.push().key;

    try {
      this.setState({loading: true});

      const order = await Modules.Order.createCheckOutOrder({
        ...this,
        orderKey,
      });

      await orderRef.update({[orderKey]: order});
      setOrder({...orders, [orderKey]: order});

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
              added_at: remainItem.added_at,
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
              added_at: remainItem.added_at,
              quantity: remainItem.quantity - 1,
            };
          } else {
            result[remainItem.key] = {
              key: remainItem.key,
              name: remainItem.name,
              price: remainItem.price,
              added_at: remainItem.added_at,
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
    const {componentId, restaurant, isStartGroupOrder, cart} = this.props;

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
        ) : null}
      </View>
    );
  }
}

const mapState = ({order, cart, profile}) => ({
  cart: cart.data,
  orders: order.data,
  profile: profile.data,
  isStartGroupOrder: cart.enableGroupOrderSession,
});

const mapDispatch = {
  setCartKey: CartActions.setCartKey,
  setCartItem: CartActions.setCartItem,
  setOrder: OrderActions.setOrderHistory,
};

export default connect(mapState, mapDispatch)(Checkout);
