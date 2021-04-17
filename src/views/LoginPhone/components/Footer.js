import React from 'react';
import {Dimensions} from 'react-native';
import styled from 'styled-components/native';
import TermCondition from './TermCondition';

const SCREEN_WIDTH = Dimensions.get('screen').width;

const Wrapper = styled.View`
  height: 100px;
  background-color: #fcbd3e;
  align-items: center;
  justify-content: center;
  width: ${SCREEN_WIDTH}px;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
`;

const Text = styled.Text``;

export default class Header extends React.PureComponent {
  render() {
    return (
      <Wrapper>
        <Text>by continuing you agree to our</Text>
        <TermCondition />
      </Wrapper>
    );
  }
}
