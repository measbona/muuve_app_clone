import React from 'react';
import {Dimensions} from 'react-native';
import styled from 'styled-components';

import Link from './link';

const SCREEN_WIDTH = Dimensions.get('screen').width;

const FormWrapper = styled.View`
  width: ${SCREEN_WIDTH - 30}px;
  margin-top: 40px;
`;

const TextContent = styled.Text`
  font-size: 18px;
  font-weight: 700;
  color: #fcbd3e;
`;

const TextDetail = styled.Text`
  font-size: 16px;
  margin-vertical: 5px;
`;

const Img = styled.Image`
  width: ${SCREEN_WIDTH - 30}px;
  height: 300px;
`;

const ButtonWrapper = styled.TouchableOpacity`
  height: 40px;
  margin-top: 40px;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  margin-vertical: 5px;
  background-color: blue;
`;

const BtnText = styled.Text`
  font-weight: 700;
  color: white;
`;

export default class Form extends React.PureComponent {
  render() {
    return (
      <FormWrapper>
        <TextContent>Start a group order</TextContent>
        <TextDetail>
          Allow participants to add items to your order. Large order may take
          longer to prepare.
        </TextDetail>
        <Img source={require('../../../assets/friends.png')} />
        <Link />
        <ButtonWrapper activeOpacity={0.7}>
          <BtnText> SHARE LINK </BtnText>
        </ButtonWrapper>
      </FormWrapper>
    );
  }
}
