import React from 'react';
import styled from 'styled-components/native';

import Colors from '../../../utils/colors';

const Wrapper = styled.View`
  padding-top: 5px;
  padding-bottom: 15px;
  margin-horizontal: 16px;
`;

const Headline = styled.Text`
  font-size: 15px;
  font-weight: bold;
  margin-bottom: 5px;
  color: ${Colors.blue};
  padding-vertical: 10px;
`;

const Content = styled.View``;

const Row = styled.View`
  margin-bottom: 8px;
  flex-direction: row;
  justify-content: space-between;
`;

const Title = styled.Text`
  font-size: 13px;
  font-weight: bold;
  ${(props) => props.GrandTotal && `color: ${Colors.blue}`}
`;

const Price = styled.Text`
  font-size: 13px;
  font-weight: bold;
  ${(props) => (props.GrandTotal || props.Free) && `color: ${Colors.blue}`}
`;

export default (props) => {
  return (
    <Wrapper>
      <Headline>Payment</Headline>
      <Content>
        <Row>
          <Title>Total</Title>
          <Price>$2.97</Price>
        </Row>
        <Row>
          <Title>Delivery Fee</Title>
          <Price Free>FREE</Price>
        </Row>
        <Row>
          <Title GrandTotal>Grand Total</Title>
          <Price GrandTotal>$2.97</Price>
        </Row>
      </Content>
    </Wrapper>
  );
};
