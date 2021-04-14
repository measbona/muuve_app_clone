import React from 'react';
import styled from 'styled-components/native';

import Header from './components/Header';
import MerchantCard from './components/Card';

const Container = styled.View`
  flex: 1;
  background-color: #f3f3f3;
`;

const ContentWrapper = styled.View`
  flex: 1;
  margin-horizontal: 16px;
`;

const HeadlineWrapper = styled.View`
  margin-vertical: 20px;
`;

const Headline = styled.Text`
  font-size: 17px;
  font-weight: 700;
  color: #004da6;
`;

export default class Home extends React.PureComponent {
  render() {
    return (
      <Container>
        <Header onCartPress={(value) => alert(value)} />
        <ContentWrapper>
          <HeadlineWrapper>
            <Headline>All Stores</Headline>
          </HeadlineWrapper>
          <MerchantCard />
          <MerchantCard />
        </ContentWrapper>
      </Container>
    );
  }
}
