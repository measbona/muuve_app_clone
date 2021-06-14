import React from 'react';
import {map} from 'lodash'
import styled from 'styled-components/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
  state = {
    restaurants: null
  }

  componentDidMount() {
    this.getRestaurantsFromStorage()
  };

  getRestaurantsFromStorage = async () => {
    const restaurantStorage = await AsyncStorage.getItem('restaurants')
    const restaurants = JSON.parse(restaurantStorage)

    this.setState({ restaurants })
  };

  onCartPress = () => {
    showModalNotice({
      headline: 'Noticed',
      description: 'Your cart is empty.',
      buttonName: 'Cancel',
    });
  };

  onMerchantPress = restaurant => {
    const {componentId} = this.props;

    goToMerchant(componentId, { restaurant });
  };

  render() {
    const { restaurants } = this.state

    return (
      <Container>
        <Header onCartPress={this.onCartPress} />
        <ContentWrapper>
          <HeadlineWrapper>
            <Headline>All Stores</Headline>
          </HeadlineWrapper>
          <ScrollView showVerticalScrollIndicator={false}>
            {map(restaurants, restaurant => (
              <React.Fragment key={restaurant.key}>
                <MerchantCard restaurant={restaurant} onPress={() => this.onMerchantPress(restaurant)} />
              </React.Fragment>
            ))}
          </ScrollView>
        </ContentWrapper>
      </Container>
    );
  }
}
