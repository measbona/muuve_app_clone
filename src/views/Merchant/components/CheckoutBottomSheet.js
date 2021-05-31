import React from 'react';
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

export default (props) => {
  const {onPress} = props;

  return (
    <Wrapper activeOpacity={0.5} onPress={onPress}>
      <ItemAmountWrapper>
        <PriceWrapper>
          <Text>1 Item</Text>
          <Text>Total Price</Text>
        </PriceWrapper>
        <Price>$2.97</Price>
      </ItemAmountWrapper>
      <CheckoutWrapper>
        <Checkout>Checkout</Checkout>
        <MIcon name="arrow-forward" size={18} style={{marginLeft: 5}} />
      </CheckoutWrapper>
    </Wrapper>
  );
};
