import React from 'react';
import styled from 'styled-components/native';
import {showModalChoice, goToGroupOrderCart} from '../../navigation/screen';

import Colors from '../../utils/colors';

import NavigationBack from '../../lib/NavigationBack';
import Merchant from './components/Merchant';
import GroupOrder from './components/GroupOrder';
import PlaceOrder from './components/PlaceOrder';
import DeliveryLocation from './components/DeliveryLocation';
import PaymentOptions from './components/PaymentOption';
import Promocode from './components/Promocode';
import Payment from './components/Payment';

const Container = styled.View`
  flex: 1;
`;

const ScrollView = styled.ScrollView`
  flex: 1;
`;

const Divider = styled.View`
  padding-vertical: 4px;
  background-color: ${Colors.lightGrey};
`;

class Checkout extends React.PureComponent {
  onPlaceOrderPress = () => {
    showModalChoice({
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

    goToGroupOrderCart(componentId);
  };

  render() {
    const {componentId} = this.props;

    return (
      <Container>
        <NavigationBack title="Checkout" navigate componentId={componentId} />
        <ScrollView>
          <Merchant />
          <Divider />
          <DeliveryLocation />
          <Divider />
          <GroupOrder onPress={this.onGroupOrderPress} />
          <Divider />
          <PaymentOptions />
          <Divider />
          <Promocode />
          <Divider />
          <Payment />
          <Divider />
        </ScrollView>
        <PlaceOrder onPress={this.onPlaceOrderPress} />
      </Container>
    );
  }
}

export default Checkout;
