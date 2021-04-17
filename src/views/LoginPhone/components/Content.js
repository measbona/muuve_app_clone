import React from 'react';
import {Dimensions} from 'react-native';
import styled from 'styled-components/native';
import From from './Form';

const SCREEN_WIDTH = Dimensions.get('screen').width;

const ContentWrapper = styled.View`
  flex: 1;
  width: ${SCREEN_WIDTH}px;
  align-items: center;
`;

export default class PhoneForm extends React.PureComponent {
  render() {
    return (
      <ContentWrapper>
        <From />
      </ContentWrapper>
    );
  }
}
