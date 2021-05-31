import React from 'react';
import styled from 'styled-components/native';
import {showModalNotice, goToMerchant} from '../../navigation/screen';

import Colors from '../../utils/colors';

import Header from './components/Header';
import MerchantCard from './components/Card';

const Container = styled.View`
  flex: 1;
  background-color: ${Colors.lightGrey};
`;

const ContentWrapper = styled.View`
  flex: 1;
  margin-horizontal: 16px;
`;

const HeadlineWrapper = styled.View`
  margin-vertical: 13px;
`;

const Headline = styled.Text`
  font-size: 17px;
  font-weight: bold;
  color: ${Colors.blue};
`;

const ScrollView = styled.ScrollView`
  flex: 1;
`;

export default class Home extends React.PureComponent {
  onCartPress = () => {
    showModalNotice({
      headline: 'Noticed',
      description: 'Your cart is empty.',
      buttonName: 'Cancel',
    });
  };

  onMerchantPress = () => {
    const {componentId} = this.props;

    goToMerchant(componentId);
  };

  render() {
    return (
      <Container>
        <Header onCartPress={this.onCartPress} />
        <ContentWrapper>
          <HeadlineWrapper>
            <Headline>All Stores</Headline>
          </HeadlineWrapper>
          <ScrollView showVerticalScrollIndicator={false}>
            <MerchantCard onPress={this.onMerchantPress} />
            <MerchantCard onPress={this.onMerchantPress} />
            <MerchantCard onPress={this.onMerchantPress} />
          </ScrollView>
        </ContentWrapper>
      </Container>
    );
  }
}
