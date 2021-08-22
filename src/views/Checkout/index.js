import React from 'react';
import {connect} from 'react-redux';
import {View, ScrollView, StyleSheet} from 'react-native';
import * as Navigator from '../../navigation/screen';
import * as Animatable from 'react-native-animatable';

import utils from '../../utils';

import NavBar from '../../lib/NavBar';
import PaymentSection from './components/PaymentSection';
import MerchantSection from './components/MerchantSection';
import PromocodeSection from './components/PromocodeSection';
import ItemSection from './components/ItemSection';
import PlaceOrder from './components/PlaceOrder';
import PaymentOptionSection from './components/PaymentOptionSection';
import DeliveryLocationSection from './components/DeliveryLocationSection';

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
      onPress: () => {},
    });
  };

  onGroupOrderPress = () => {
    const {componentId} = this.props;

    Navigator.goToGroupOrderCart(componentId);
  };

  render() {
    const {mounted} = this.state;
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
                isStartGroupOrder={isStartGroupOrder}
                onPress={this.onGroupOrderPress}
              />
              <PaymentOptionSection />
              <PromocodeSection />
              <PaymentSection cart={cart} />
            </ScrollView>
            <PlaceOrder onPress={this.onPlaceOrderPress} />
          </Animatable.View>
        ) : null}
      </View>
    );
  }
}

const mapState = ({cart}) => ({
  cart: cart.data,
  isStartGroupOrder: cart.enableGroupOrderSession,
});

export default connect(mapState)(Checkout);
