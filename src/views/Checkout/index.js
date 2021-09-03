/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {connect} from 'react-redux';
import {View, ScrollView, StyleSheet} from 'react-native';
import {omit, size, every} from 'lodash';
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
    const {isStartGroupOrder, groupOrder, syncGroupOrder} = this.props;

    this.setState({mounted: true});

    if (isStartGroupOrder) {
      syncGroupOrder(groupOrder.group_key);
    }
  }

  componentDidDisappear() {
    const {isStartGroupOrder, unSyncGroupOrder} = this.props;

    if (isStartGroupOrder) {
      unSyncGroupOrder();
    }
  }

  validate = () => {
    const {isStartGroupOrder, groupOrder} = this.props;

    const isParticipantReady = every(
      groupOrder.joined_users,
      (participant) => participant.ready === true,
    );

    return new Promise((resolve, reject) => {
      if (isStartGroupOrder && !isParticipantReady) {
        return Navigator.showModalChoice({
          headline: 'Confirmation',
          description:
            'We notice that some participants not yet ready to order. Do you want to continue?',
          no: 'CANCEL',
          yes: 'CONTINUE',
          onPress: () => resolve(true),
        });
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
      const validated = await this.validate();

      if (validated) {
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
      }
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

  onDecrease = async (item) => {
    const {componentId, cart, setCartKey, setCartItem} = this.props;

    let newSelectedItems = {};
    const {quantity, removeItem} = await Navigator.showItemDetail({
      item,
      type: 'checkout',
    });

    if (removeItem) {
      newSelectedItems = omit(cart, [item.key]);
    } else {
      newSelectedItems = {
        ...cart,
        [item.key]: {
          ...item,
          quantity,
        },
      };
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
            delay={300}
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
              <PaymentSection cart={cart} restaurant={restaurant} />
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
  syncGroupOrder: OrderActions.syncGroupOrder,
  unSyncGroupOrder: OrderActions.unSyncGroupOrder,
  removeGroupOrderData: OrderActions.removeGroupOrderData,
};

export default connect(mapState, mapDispatch)(Checkout);
