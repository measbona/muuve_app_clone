import React from 'react';
import {Dimensions} from 'react-native';
import styled from 'styled-components/native';
const SCREEN_WIDTH = Dimensions.get('screen').width;

const Wrapper = styled.View`
  border-radius: 50px;
  height: 38px;
  padding-horizontal: 100px;
  align-items: center;
  justify-content: center;
  background-color: #fcbd3e;
`;

const LoginButton = styled.TouchableOpacity``;

const LoginText = styled.Text``;

export default class ButtonLogin extends React.PureComponent {
  render() {
    return (
      <Wrapper>
        <LoginButton
          hitSlop={{top: 40, bottom: 40, left: SCREEN_WIDTH, right: SCREEN_WIDTH}}
          activeOpacity={0.7}
          onPress={() => alert('clicked')}>
          <LoginText>SAVE</LoginText>
        </LoginButton>
      </Wrapper>
      
    );
  }
}