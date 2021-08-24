import React from 'react';
import {connect} from 'react-redux';
import {View, ScrollView, StyleSheet} from 'react-native';
import moment from 'moment';
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
    const {
      componentId,
      orders,
      profile,
      cart,
      restaurant,
      setOrder,
    } = this.props;

    const orderRef = firebase
      .database()
      .ref(`/deliveree_orders/${profile.phone_number}`);
    const orderKey = orderRef.push().key;

    const items = Modules.Item.serializeItems(cart);

    try {
      this.setState({loading: true});

      const data = {
        items,
        key: orderKey,
        delivery_fee: 3,
        status: 'delivered',
        is_group_order: false,
        region: profile.region,
        deliveree: profile.uid,
        tel: profile.phone_number,
        delivery_address: 'current_address',
        delivery_place_name: 'Toul Tom pong',
        created_at: Number(moment().format('x')),
        sub_total: utils.helpers.sumCartTotal(cart),
        deliveree_name: `${profile.family_name} ${profile.first_name}`,
        requestCoords: {
          latitude: 11.612735616803565,
          longitude: 104.90922453012595,
        },
        restaurant: {
          key: restaurant.key,
          name: restaurant.name,
          branch: Object.values(restaurant.branches)[0],
          cooking_duration: restaurant.cooking_duration,
        },
      };

      await orderRef.update({[orderKey]: data});
      setOrder({...orders, [orderKey]: data});

      this.setState({loading: false});

      await Navigator.showModalSuccess();
      Navigator.goToOrderDetails(componentId, {order: data});
    } catch (error) {
      console.tron.log(error.message);
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
                onPress={this.onGroupOrderPress}
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
  setOrder: OrderActions.setOrderHistory,
};

export default connect(mapState, mapDispatch)(Checkout);
