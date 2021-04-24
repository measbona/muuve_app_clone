import React from 'react';
import {ActivityIndicator} from 'react-native';
import styled from 'styled-components/native';

import utils from '../../utils';

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${utils.colors.yellow};
`;

export default () => {
  return (
    <Container>
      <ActivityIndicator size="small" color="black" animating />
    </Container>
  );
};
