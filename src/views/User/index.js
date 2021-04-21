import React from 'react';
import styled from 'styled-components/native';

import Header from './components/Header';
import Language from './components/Language';
import Currency from './components/Currency';
import Notification from './components/Notification';
import Logout from './components/Logout';

const Container = styled.View`
  background-color: #f3f3f3;
`;

export default class Profile extends React.Component {
  render() {
    return (
      <Container>
        <Header />
        <Language />
        <Currency />
        <Notification />
        <Logout />
      </Container>
    );
  }
}