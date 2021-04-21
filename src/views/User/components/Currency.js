import React from 'react';
import styled from 'styled-components/native';
import {Dimensions} from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';

const SCREEN_WIDTH = Dimensions.get('screen').width;

const Wrapper = styled.View``;

const BunttonCurrency = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  height:46px;
  background-color: white;
  padding-horizontal : 15px;
`;

const TextCurrency = styled.Text`
  width: ${SCREEN_WIDTH - 115}px;
  margin-left: 15px;
  font-size: 14px;
`;

const IconWrapper = styled.View`
  width: 20px;
  align-items: center;
`;

const TextCurrencyChange = styled.Text`
  width: 50px;
  color: #0A5BB2;
  font-weight: 700;
  text-align: right;
  font-size: 14px;
`;

export default class Currency extends React.Component {
  render() {
    return (
      <Wrapper>
        <BunttonCurrency
          activeOpacity={0.7}
          onPress={() => alert('Currency')}
        >
          <IconWrapper>
            <Fontisto name="dollar" size={18}/>
          </IconWrapper>
          <TextCurrency>Currency</TextCurrency>
          <TextCurrencyChange>KHR</TextCurrencyChange>
        </BunttonCurrency>
      </Wrapper>
    );
  }
}