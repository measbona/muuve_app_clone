import React from 'react';
import styled from 'styled-components';

import Header from './components/header';
import Content from './components/content';

const Container = styled.View`
  flex: 1;
  background-color: #f3f3f3;
`;

export default class GroupOrder extends React.PureComponent {
  render() {
    return (
      <Container>
        <Header />
        <Content />
      </Container>
    );
  }
}
