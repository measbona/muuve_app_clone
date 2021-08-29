/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {connect} from 'react-redux';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {get, find} from 'lodash';
import * as Navigator from '../../navigation/screen';
import * as Animatable from 'react-native-animatable';

import utils from '../../utils';

import Loading from '../../lib/Loading';
import Header from './components/Header';
import Restaurant from './components/Restaurant';

import CartActions from '../../redux/CartRedux';
import OrderActions from '../../redux/OrderRedux';
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
    loading: false,
  };

  componentDidMount() {
    const {loaded, fetchRestaurants, isStartGroupOrder} = this.props;

    if (!loaded) {
      fetchRestaurants();
    }

    if (isStartGroupOrder) {
      this.handleParticipant();
    }

    Navigator.bindComponent(this);
  }

  componentDidAppear() {
    const {
      profile,
      groupOrder,
      setCartItem,
      removeParticipant,
      isStartGroupOrder,
    } = this.props;

    this.setState({mounted: true});

    const isAlreadyLeft = !get(
      groupOrder,
      ['joined_users', profile.uid, 'joined'],
      false,
    );

    if (isStartGroupOrder && isAlreadyLeft) {
      removeParticipant();
      setCartItem({});
    }
  }

  handleParticipant = () => {
    const {profile, groupOrder, restaurants, componentId} = this.props;

    this.setState({loading: true});

    const restaurantKey = get(groupOrder, 'restaurant.key', '');
    const restaurant = restaurants[restaurantKey];
    const currentUser = find(
      groupOrder.joined_users,
      (user) => user.key === profile.uid,
    );

    const isParticipant = !get(currentUser, 'host', false);

    if (isParticipant) {
      this.setState({loading: false});

      return Navigator.goToMerchantDetails(componentId, {restaurant});
    }
  };

  onMerchantPress = (restaurant) => {
    const {componentId} = this.props;

    return Navigator.goToMerchantDetails(componentId, {restaurant});
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
    const {mounted, loading} = this.state;
    const {restaurants, loaded} = this.props;

    const restaurantData = utils.helpers.convertObjectToArray(restaurants);

    return (
      <View style={styles.conatiner}>
        <Header onCartPress={() => {}} />

        {(loaded && mounted) || loading ? (
          <FlatList
            data={restaurantData}
            renderItem={this.renderRestaurant}
            contentContainerStyle={styles.flatList}
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

const mapState = ({profile, restaurant, order}) => ({
  profile: profile.data,
  loaded: restaurant.loaded,
  restaurants: restaurant.data,
  groupOrder: order.groupOrderData,
  isStartGroupOrder: order.groupOrderEnabled,
});

const mapDispatch = {
  setUrl: OrderActions.setUrl,
  setCartItem: CartActions.setCartItem,
  removeParticipant: OrderActions.removeParticipant,
  fetchRestaurants: RestaurantActions.getRestaurants,
};

export default connect(mapState, mapDispatch)(Home);
