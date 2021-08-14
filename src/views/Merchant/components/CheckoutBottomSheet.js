import React from 'react';
import {size, forEach} from 'lodash';
import styled from 'styled-components/native';
import MIcon from 'react-native-vector-icons/MaterialIcons';

import Colors from '../../../utils/colors';

const Wrapper = styled.TouchableOpacity`
  justify-content: space-between;
  padding-horizontal: 20px;
  flex-direction: row;
  padding-bottom: 20px;
  border-top-left-radius: 17px;
  border-top-right-radius: 17px;
  background-color: ${Colors.yellow};
`;

const ItemAmountWrapper = styled.View`
  margin-vertical: 15px;
  flex-direction: row;
  justify-content: space-between;
`;

const Text = styled.Text`
  font-size: 14px;
  font-weight: 600;
`;

const PriceWrapper = styled.View`
  align-self: flex-end;
`;

const Price = styled.Text`
  font-size: 16px;
  align-self: flex-end;
  margin-left: 20px;
  font-weight: 600;
  color: ${Colors.blue};
`;

const CheckoutWrapper = styled.View`
  align-items: center;
  flex-direction: row;
`;

const Checkout = styled.Text`
  font-size: 16px;
  font-weight: 600;
`;

const sumCartTotal = (cart) => {
  let total = 0;

  forEach(cart, (item) => (total += item.price));

  return total;
};

export default (props) => {
  const {cart, onPress} = props;
  const itemCount = size(cart);

  return (
    <Wrapper activeOpacity={0.5} onPress={onPress}>
      <ItemAmountWrapper>
        <PriceWrapper>
          <Text>
            {itemCount === 1 ? `${itemCount} Item` : `${itemCount} Items`}
          </Text>
          <Text>Total Price</Text>
        </PriceWrapper>
        <Price>{`$ ${sumCartTotal(cart)}`}</Price>
      </ItemAmountWrapper>
      <CheckoutWrapper>
        <Checkout>Checkout</Checkout>
        <MIcon name="arrow-forward" size={18} style={{marginLeft: 5}} />
      </CheckoutWrapper>
    </Wrapper>
  );
};
