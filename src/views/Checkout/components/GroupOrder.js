import React from 'react';
import styled from 'styled-components/native';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';

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

const GroupInfo = styled.TouchableOpacity`
  margin-bottom: 25px;
  flex-direction: row;
  justify-content: space-between;
`;

const Row = styled.View`
  flex-direction: row;
`;

const Icon = styled.View`
  border-radius: 50px;
  padding-vertical: 3px;
  align-self: flex-start;
  padding-horizontal: 12px;
  background-color: ${Colors.grey};
`;

const Column = styled.View`
  margin-left: 10px;
`;

const PriceWrapper = styled.View`
  flex-direction: row;
`;

const ItemsCount = styled.Text`
  font-size: 15px;
  font-weight: bold;
  align-self: flex-end;
`;

const Status = styled.Text`
  font-size: 13px;
  font-weight: bold;
  margin-bottom: 4px;
`;

const Participants = styled.Text`
  font-size: 11px;
  font-weight: 300;
`;

const Price = styled.Text`
  font-size: 15px;
  font-weight: bold;
  align-self: flex-end;
  color: ${Colors.blue};
`;

const UnavailableItems = styled.Text`
  font-size: 13px;
  font-weight: 300;
  margin-bottom: 7px;
`;

const Button = styled.TouchableOpacity`
  border-radius: 50px;
  align-self: flex-end;
  padding-vertical: 4px;
  padding-horizontal: 15px;
  background-color: ${Colors.grey};
`;

const ButtonText = styled.Text`
  font-size: 11px;
  font-weight: 700;
  color: ${Colors.blue};
`;

export default (props) => {
  const {onPress} = props;

  return (
    <Wrapper>
      <Headline>Group Order</Headline>
      <GroupInfo activeOpacity={0.7} onPress={onPress}>
        <Row>
          <Icon>
            <MCIcon
              name="playlist-edit"
              size={16}
              color={Colors.blue}
              style={{marginLeft: 5}}
            />
          </Icon>
          <Column>
            <Status>Ready to Checkout</Status>
            <Participants>3 Participants</Participants>
          </Column>
        </Row>
        <PriceWrapper>
          <ItemsCount>3 x </ItemsCount>
          <Price>$5.55</Price>
        </PriceWrapper>
      </GroupInfo>
      <UnavailableItems>
        What if any items of your order are unavailable?
      </UnavailableItems>
      <Button>
        <ButtonText>Replace with similiar item</ButtonText>
      </Button>
    </Wrapper>
  );
};
