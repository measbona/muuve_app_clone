import React from 'react';
import styled from 'styled-components/native';
import Header from './components/Header';
import Content from './components/Content';
import Footer from './components/Footer';

const Container = styled.View`
  flex: 1;
  background-color: #f3f3f3;
`;

export default class Home extends React.PureComponent {
  render() {
    return (
      <Container>
        <Header />
        <Content />
        <Footer />
      </Container>
    );
  }
}
