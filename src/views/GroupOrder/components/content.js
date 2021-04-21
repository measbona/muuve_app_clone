import React from 'react';
import {Dimensions} from 'react-native';
import styled from 'styled-components';

import From from './form';

const SCREEN_WIDTH = Dimensions.get('screen').width;

const ContentWrapper = styled.View`
  flex: 1;
  align-items: center;
  width: ${SCREEN_WIDTH}px;
`;

export default class Content extends React.PureComponent {
  render() {
    return (
      <ContentWrapper>
        <From />
      </ContentWrapper>
    );
  }
}
