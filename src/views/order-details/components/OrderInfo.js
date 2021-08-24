import React from 'react';
import styled from 'styled-components/native';

import Colors from '../../../utils/colors';

const Wrapper = styled.View`
  margin-vertical: 10px;
`;

const HealineWrapper = styled.View`
  margin-bottom: 5px;
  margin-horizontal: 16px;
`;

const Headline = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${Colors.blue};
`;

const Row = styled.View`
  align-items: center;
  flex-direction: row;
  margin-vertical: 10px;
  margin-horizontal: 16px;
  justify-content: space-between;
`;

const BadgeWrapper = styled.View`
  align-items: center;
  border-radius: 50px;
  padding-vertical: 3px;
  justify-content: center;
  padding-horizontal: 20px;
  background-color: ${Colors.grey};
`;

const Item = styled.View`
  align-items: center;
  flex-direction: row;
`;

const BadgeNumber = styled.Text`
  font-size: 13px;
  font-weight: 600;
`;

const ItemName = styled.Text`
  margin-left: 10px;
  font-weight: 500;
`;

const Price = styled.View`
  align-items: center;
  flex-direction: row;
`;

const Amount = styled.Text`
  font-weight: 500;
`;

const Total = styled.Text`
  font-weight: bold;
  color: ${Colors.blue};
`;

export default (props) => {
  return (
    <Wrapper>
      <HealineWrapper>
        <Headline>Your Order</Headline>
      </HealineWrapper>
      <Row>
        <Item>
          <BadgeWrapper>
            <BadgeNumber>1</BadgeNumber>
          </BadgeWrapper>
          <ItemName>Sukiyaki Beef</ItemName>
        </Item>
        <Price>
          <Amount>7 x </Amount>
          <Total>$38.6</Total>
        </Price>
      </Row>
    </Wrapper>
  );
};
