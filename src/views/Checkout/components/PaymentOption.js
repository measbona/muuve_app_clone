import React from 'react';
import styled from 'styled-components/native';

import Colors from '../../../utils/colors';

const Wrapper = styled.View`
  padding-top: 5px;
  padding-bottom: 15px;
  margin-horizontal: 16px;
`;

const HealineWrapper = styled.View`
  margin-bottom: 5px;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`;

const Button = styled.TouchableOpacity`
  border-radius: 50px;
  padding-vertical: 4px;
  padding-horizontal: 15px;
  background-color: ${Colors.grey};
`;

const ButtonText = styled.Text`
  font-size: 11px;
  font-weight: 700;
  color: ${Colors.blue};
`;

const Headline = styled.Text`
  font-size: 15px;
  font-weight: bold;
  color: ${Colors.blue};
  padding-vertical: 10px;
`;

const Payment = styled.View`
  justify-content: space-between;
  flex-direction: row;
`;

const BankIcon = styled.Image`
  width: 45px;
  height: 30px;
`;

const Column = styled.View``;

const Row = styled.View`
  flex-direction: row;
`;

const BankName = styled.Text`
  font-size: 13px;
  font-weight: bold;
  margin-bottom: 4px;
`;

const BankNumber = styled.Text`
  font-size: 11px;
  font-weight: 300;
`;

const EditCardButtton = styled.TouchableOpacity`
  align-self: center;
  border-radius: 50px;
  padding-vertical: 4px;
  padding-horizontal: 15px;
  background-color: ${Colors.grey};
`;

export default (props) => {
  return (
    <Wrapper>
      <HealineWrapper>
        <Headline>Payment Option</Headline>
        <Button activeOpacity={0.7}>
          <ButtonText>Change</ButtonText>
        </Button>
      </HealineWrapper>
      <Payment>
        <Row>
          <BankIcon
            source={require('../../../assets/icons/union_pay.png')}
            style={{marginRight: 10}}
          />
          <Column>
            <BankName>UnionPay</BankName>
            <BankNumber>**** **** **** 0005</BankNumber>
          </Column>
        </Row>
        <EditCardButtton activeOpacity={0.7}>
          <ButtonText>Edit Card</ButtonText>
        </EditCardButtton>
      </Payment>
    </Wrapper>
  );
};
