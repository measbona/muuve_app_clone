import React from 'react';
import styled from 'styled-components/native';

import Colors from '../../../utils/colors';

const Wrapper = styled.View`
  margin-vertical: 10px;
  margin-horizontal: 16px;
`;

const HealineWrapper = styled.View`
  margin-bottom: 5px;
`;

const Headline = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${Colors.blue};
`;

const Detail = styled.View``;

const Row = styled.View`
  flex-direction: row;
  margin-vertical: 5px;
  justify-content: space-between;
`;

const Name = styled.Text`
  font-weight: 700;
`;

const TotalPrice = styled.Text`
  font-weight: 700;
`;

const DeliveryFee = styled.Text`
  font-weight: 700;
  color: ${Colors.blue};
`;

const GrandTotal = styled.Text`
  font-weight: 700;
  color: ${Colors.blue};
`;

export default (props) => {
  return (
    <Wrapper>
      <HealineWrapper>
        <Headline>Payment</Headline>
      </HealineWrapper>
      <Detail>
        <Row>
          <Name>Total</Name>
          <TotalPrice>$2.97</TotalPrice>
        </Row>
        <Row>
          <Name>Delivery Fee</Name>
          <DeliveryFee>FREE</DeliveryFee>
        </Row>
        <Row>
          <Name>Grand Total</Name>
          <GrandTotal>$2.97</GrandTotal>
        </Row>
      </Detail>
    </Wrapper>
  );
};
