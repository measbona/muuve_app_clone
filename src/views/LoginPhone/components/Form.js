import React from 'react';
import {Dimensions} from 'react-native';
import styled from 'styled-components';
import PhoneWrapper from './PhoneWrapper';
import BtnWrapper from './BtnWrapper';

const SCREEN_WIDTH = Dimensions.get('screen').width;

const FormWrapper = styled.View`
  margin-top: 100px;
  width: ${SCREEN_WIDTH - 30}px;
`;
const Text = styled.Text`
  margin-vertical: 5px;
  margin-horizontal: 5px;
  font-size: 18px;
`;

export default class Form extends React.PureComponent {
  render() {
    return (
      <FormWrapper>
        <Text>Login with your phone number</Text>
        <PhoneWrapper />
        <BtnWrapper />
      </FormWrapper>
    );
  }
}
