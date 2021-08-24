import React from 'react';
import {connect} from 'react-redux';
import {View, ScrollView, StyleSheet} from 'react-native';
import {size} from 'lodash';
import * as Navigator from '../../navigation/screen';
import * as Animatable from 'react-native-animatable';

import utils from '../../utils';

import NavBar from '../../lib/NavBar';
import ItemSection from '../checkout/components/ItemSection';
import PaymentSection from '../checkout/components/PaymentSection';
import MerchantSection from '../checkout/components/MerchantSection';
import DeliveryLocationSection from '../checkout/components/DeliveryLocationSection';

import CartActions from '../../redux/CartRedux';

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    backgroundColor: utils.colors.lightGrey,
  },
  content: {flex: 1},
});

class OrderDetails extends React.PureComponent {
  state = {
    mounted: false,
  };

  componentDidMount() {
    this.clearCart();

    Navigator.bindComponent(this);
  }

  clearCart = () => {
    const {cart, setCartItem, setCartKey} = this.props;

    if (size(cart) > 0) {
      setCartItem({});
      setCartKey(null);
    }

    return null;
  };

  componentDidAppear() {
    this.setState({mounted: true});
  }

  render() {
    const {mounted} = this.state;
    const {componentId, order} = this.props;

    return (
      <View style={styles.conatiner}>
        <NavBar
          popToRoot
          title="Order Details"
          componentId={componentId}
          style={{backgroundColor: utils.colors.yellow}}
        />

        {mounted ? (
          <Animatable.View
            style={styles.content}
            animation="fadeIn"
            duration={300}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <MerchantSection orderType="order-details" order={order} />
              <DeliveryLocationSection
                orderType="order-details"
                order={order}
              />
              <ItemSection orderType="order-details" order={order} />
              <PaymentSection orderType="order-details" order={order} />
            </ScrollView>
          </Animatable.View>
        ) : null}
      </View>
    );
  }
}

const mapState = ({cart}) => ({
  cart: cart.data,
});

const mapDispatch = {
  setCartKey: CartActions.setCartKey,
  setCartItem: CartActions.setCartItem,
};

export default connect(mapState, mapDispatch)(OrderDetails);
