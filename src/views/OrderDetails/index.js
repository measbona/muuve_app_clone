import React from 'react';
import styled from 'styled-components/native';
import NavigationBack from '../../lib/NavigationBack';

import Colors from '../../utils/colors';

import MerchantInfo from './components/MerchantInfo';
import OrderInfo from './components/OrderInfo';
import Payment from './components/Payment';

const Container = styled.View`
  flex: 1;
`;

const ScrollView = styled.ScrollView`
  flex: 1;
`;

const Divider = styled.View`
  border-width: 3px;
  border-color: ${Colors.lightGrey};
`;

export default class OrderDetails extends React.PureComponent {
  render() {
    const {componentId} = this.props;

    return (
      <Container>
        <NavigationBack
          title="Order Details"
          navigate
          componentId={componentId}
        />
        <ScrollView showVerticalScrollIndicator={false}>
          <MerchantInfo />
          <Divider />
          <OrderInfo />
          <Divider />
          <Payment />
        </ScrollView>
      </Container>
    );
  }
}
