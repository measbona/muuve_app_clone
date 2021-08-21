import React from 'react';
import {connect} from 'react-redux';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import {showModalNotice, goToMerchant} from '../../navigation/screen';

import utils from '../../utils';

import Header from './components/Header';
import MerchantCard from './components/Card';

import RestaurantActions from '../../redux/RestaurantRedux';

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    backgroundColor: utils.colors.lightGrey,
  },
  contentWrapper: {
    flex: 1,
    marginHorizontal: 16,
  },
  headlineWrapper: {marginVertical: 13},
  headline: {
    fontSize: 18,
    fontWeight: 'bold',
    color: utils.colors.blue,
  },
  flatList: {marginHorizontal: 15},
  loading: {
    flex: 1,
    justifyContent: 'center',
  },
});

class Home extends React.PureComponent {
  componentDidMount() {
    const {loaded, fetchRestaurants} = this.props;

    if (!loaded) {
      fetchRestaurants();
    }
  }

  onCartPress = () => {
    showModalNotice({
      headline: 'Noticed',
      description: 'Your cart is empty.',
      buttonName: 'Cancel',
    });
  };

  onMerchantPress = (restaurant) => {
    const {componentId} = this.props;

    goToMerchant(componentId, {restaurant});
  };

  renderHeaderComponent = () => {
    return (
      <View style={styles.headlineWrapper}>
        <Text style={styles.headline}>All Stores</Text>
      </View>
    );
  };

  renderRestaurant = ({item}) => {
    return (
      <React.Fragment key={item.key}>
        <MerchantCard
          restaurant={item}
          onPress={() => this.onMerchantPress(item)}
        />
      </React.Fragment>
    );
  };

  render() {
    const {restaurants, loaded} = this.props;

    const restaurantData = utils.helpers.convertObjectToArray(restaurants);

    return (
      <View style={styles.conatiner}>
        <Header onCartPress={this.onCartPress} />
        {loaded ? (
          <FlatList
            data={restaurantData}
            contentContainerStyle={styles.flatList}
            renderItem={this.renderRestaurant}
            ListHeaderComponent={this.renderHeaderComponent}
            keyExtractor={(restaurant) => restaurant.key}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <View style={styles.loading}>
            <ActivityIndicator
              size="large"
              color={utils.colors.yellow}
              animating
            />
          </View>
        )}
      </View>
    );
  }
}

const mapState = ({restaurant}) => ({
  loaded: restaurant.loaded,
  restaurants: restaurant.data,
});

const mapDispatch = {
  fetchRestaurants: RestaurantActions.getRestaurants,
};

export default connect(mapState, mapDispatch)(Home);
