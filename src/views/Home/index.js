/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {connect} from 'react-redux';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import * as Navigator from '../../navigation/screen';
import * as Animatable from 'react-native-animatable';

import utils from '../../utils';

import Loading from '../../lib/Loading';
import Header from './components/Header';
import Restaurant from './components/Restaurant';

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
  state = {
    mounted: false,
  };

  componentDidMount() {
    const {loaded, fetchRestaurants} = this.props;

    if (!loaded) {
      fetchRestaurants();
    }

    Navigator.bindComponent(this);
  }

  componentDidAppear() {
    this.setState({mounted: true});
  }

  onMerchantPress = (restaurant) => {
    const {componentId} = this.props;

    Navigator.goToMerchantDetails(componentId, {restaurant});
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
      <Animatable.View key={item.key} animation="fadeIn" duration={300}>
        <Restaurant
          restaurant={item}
          onPress={() => this.onMerchantPress(item)}
        />
      </Animatable.View>
    );
  };

  render() {
    const {mounted} = this.state;
    const {restaurants, loaded} = this.props;

    const restaurantData = utils.helpers.convertObjectToArray(restaurants);

    return (
      <View style={styles.conatiner}>
        <Header onCartPress={() => {}} />

        {loaded && mounted ? (
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
            <Loading color="yellow" style={{alignSelf: 'center'}} />
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
