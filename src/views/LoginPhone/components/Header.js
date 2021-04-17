import React from 'react';
import {Dimensions, Image} from 'react-native';
import styled from 'styled-components/native';

const SCREEN_WIDTH = Dimensions.get('screen').width;

const Wrapper = styled.View`
  height: 180px;
  padding-top: 30px;
  background-color: #fcbd3e;
  align-items: center;
  justify-content: center;
  width: ${SCREEN_WIDTH}px;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
`;

export default class Header extends React.PureComponent {
  render() {
    return (
      <Wrapper>
        <Image
          style={{width:150, height: 150}}
          source={require('/Users/macbook/muuve_app_clone/assets/muuve_logo.png')}
        />
      </Wrapper>
    );
  }
}
