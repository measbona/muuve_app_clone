import React from 'react';
import styled from 'styled-components/native';
import NavigationBack from '../../lib/NavigationBack';
import {goToOrderDetails} from '../../navigation/screen';

import utils from '../../utils';

import NavBar from '../../lib/NavBar';
import OrderRow from './components/Order';

const Container = styled.View`
  flex: 1;
`;

const HeadlineWrapper = styled.View`
  margin-left: 20px;
  margin-vertical: 15px;
`;

const Headline = styled.Text`
  font-size: 16px;
  font-weight: 500;
`;

const ScrollView = styled.ScrollView`
  flex: 1;
`;

export default class Order extends React.Component {
  onOrderPress = () => {
    const {componentId} = this.props;

    goToOrderDetails(componentId);
  };

  render() {
    const {componentId} = this.props;
    return (
      <Container>
        <NavBar
          title="Order"
          componentId={componentId}
          style={{backgroundColor: utils.colors.yellow}}
        />

        <HeadlineWrapper>
          <Headline>Pending Orders</Headline>
        </HeadlineWrapper>

        <ScrollView showVerticalScrollIndicator={false}>
          <OrderRow onPress={this.onOrderPress} />
        </ScrollView>
      </Container>
    );
  }
}
