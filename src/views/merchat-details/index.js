/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {connect} from 'react-redux';
import {View, FlatList, Animated, StyleSheet} from 'react-native';
import moment from 'moment';
import {get, filter, reduce, size} from 'lodash';
import * as Navigator from '../../navigation/screen';
import * as Animatable from 'react-native-animatable';

import utils from '../../utils';

import Item from './components/Item';
import Loading from '../../lib/Loading';
import SearchBar from '../../lib/SearchBar';
import TopBanner from './components/TopBanner';
import TopNavBar from './components/TopNavBar';
import GroupOrder from './components/GroupOrder';
import ListCategories from './components/ListCategories';
import CheckoutBottomSheet from './components/CheckoutBottomSheet';
import MerchantInfoSection from './components/MerchantInfoSection';

import ItemActions from '../../redux/ItemRedux';
import CartActions from '../../redux/CartRedux';

const styles = StyleSheet.create({
  emptySpace: {
    marginVertical: 25,
  },
  divider: {
    borderWidth: 1,
    marginVertical: 15,
    marginHorizontal: 20,
    borderColor: utils.colors.grey,
  },
  flatList: {marginTop: 30},
  loading: {
    flex: 1,
    justifyContent: 'center',
  },
});

class MerchantDetails extends React.PureComponent {
  constructor(props) {
    super(props);

    const {cart} = props;

    this.state = {
      mounted: false,
      selectedItems: cart || {},
    };

    this.scrollY = new Animated.Value(0);
  }

  static getDerivedStateFromProps(props, state) {
    const {selectedItems} = state;
    const {cart} = props;

    if (selectedItems !== cart) {
      return {selectedItems: cart};
    }

    return null;
  }

  componentDidMount() {
    const {items, restaurant, getItem} = this.props;
    const merchantKey = restaurant.key;

    if (!items[merchantKey]) {
      getItem(merchantKey);
    }

    Navigator.bindComponent(this);
  }

  componentDidAppear() {
    this.setState({mounted: true});
  }

  onCheckoutPress = () => {
    const {componentId, restaurant} = this.props;

    Navigator.goToCheckout(componentId, {restaurant});
  };

  onEndSession = () => {
    const {setEnableGroupOrderSession} = this.props;

    Navigator.showModalChoice({
      headline: 'End Session',
      description:
        'Your participants is ordering their items. Are you sure to terminate this session?',
      no: 'Cancel',
      yes: 'Continue',
      onPress: () => setEnableGroupOrderSession(false),
    });
  };

  onGroupOrderPress = () => {
    const {componentId, setEnableGroupOrderSession, merchant} = this.props;

    Navigator.showModalChoice({
      headline: 'Group Order',
      description:
        'Share your group order link with others. They can add their favorite items. Checkout and get it all delivered together.',
      no: 'Cancel',
      yes: 'Start Group Order',
      onPress: () => {
        setEnableGroupOrderSession(true);
        Navigator.goToGroupOrder(componentId, {merchant});
      },
    });
  };

  onItemPress = async (item, itemKey) => {
    const {selectedItems} = this.state;
    const {setCartItem, restaurant, setCartKey, cartKey} = this.props;

    const restaurantKey = restaurant.key;
    const removeItem = Boolean(selectedItems[itemKey]);

    if (cartKey && cartKey !== restaurant.key) {
      return Navigator.showModalNotice({
        headline: 'Noticed',
        description: "You can't make order with multiple stores.",
        buttonName: 'Cancel',
      });
    }

    if (removeItem) {
      const remainItems = filter(
        selectedItems,
        (selectedItem) => selectedItem.key !== itemKey,
      );
      const newSelectedItems = reduce(
        remainItems,
        (result, remainItem) => {
          result[remainItem.key] = {
            key: remainItem.key,
            name: remainItem.name,
            price: remainItem.price,
            quantity: remainItem.quantity,
            added_at: remainItem.added_at,
          };

          return result;
        },
        {},
      );

      this.setState({selectedItems: newSelectedItems});
      setCartItem(newSelectedItems);

      if (size(newSelectedItems) === 0) {
        setCartKey(null);
      }
    } else {
      const newSelectedItems = {
        ...selectedItems,
        [itemKey]: {
          quantity: 1,
          key: itemKey,
          name: item.name,
          price: item.current_price,
          added_at: Number(moment().format('x')),
        },
      };

      this.setState({selectedItems: newSelectedItems});
      setCartItem(newSelectedItems);
      setCartKey(restaurantKey);
    }
  };

  renderHeaderComponent = () => {
    const {isStartGroupOrder, restaurant} = this.props;

    const merchantName = get(restaurant, 'name', 'N/A');

    return (
      <Animatable.View animation="fadeIn" duration={300}>
        <MerchantInfoSection merchantName={merchantName} />
        <GroupOrder
          onEndSession={this.onEndSession}
          isStartGroupOrder={isStartGroupOrder}
          onGroupOrderPress={this.onGroupOrderPress}
        />
        <ListCategories />
        <SearchBar placeholder="Search" style={{marginVertical: 15}} />
      </Animatable.View>
    );
  };

  renderFooterComponent = () => {
    const {cart} = this.props;

    if (size(cart) > 0) {
      return <View style={{marginVertical: 60}} />;
    }

    return <View style={styles.emptySpace} />;
  };

  renderItem = ({item, key, index}) => {
    const {selectedItems} = this.state;
    const {restaurant, items} = this.props;

    const itemsCount = size(items[restaurant.key]);
    const isSelectedItem = selectedItems[item.key];
    const isLastItem = itemsCount === index + 1;

    return (
      <React.Fragment key={item.key}>
        <Item
          item={item}
          isSelectedItem={isSelectedItem}
          onPress={() => this.onItemPress(item, item.key)}
        />
        {!isLastItem && <View style={styles.divider} />}
      </React.Fragment>
    );
  };

  render() {
    const {mounted} = this.state;
    const {componentId, restaurant, items, cart, loaded} = this.props;

    const itemsData = utils.helpers.convertObjectToArray(items[restaurant.key]);
    const opacity = this.scrollY.interpolate({
      inputRange: [0, 100],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });

    const reverseOpacity = this.scrollY.interpolate({
      inputRange: [0, 100],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    });

    const scale = this.scrollY.interpolate({
      inputRange: [-100, 0, 100],
      outputRange: [1.2, 1, 1],
      extrapolate: 'clamp',
    });

    return (
      <View style={{flex: 1}}>
        <TopBanner
          scale={scale}
          opacity={opacity}
          banner={restaurant.images.banner}
        />
        <TopNavBar
          opacity={opacity}
          componentId={componentId}
          merchantName={restaurant.name}
          reverseOpacity={reverseOpacity}
        />

        {!loaded && mounted ? (
          <FlatList
            data={itemsData}
            contentContainerStyle={styles.flatList}
            ListHeaderComponent={this.renderHeaderComponent}
            ListFooterComponent={this.renderFooterComponent}
            showsVerticalScrollIndicator={false}
            renderItem={this.renderItem}
            keyExtractor={(item) => item.key}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {y: this.scrollY}}}],
              {useNativeDriver: false},
            )}
          />
        ) : (
          <View style={styles.loading}>
            <Loading style={{alignSelf: 'center'}} />
          </View>
        )}

        {mounted && size(cart) > 0 ? (
          <CheckoutBottomSheet cart={cart} onPress={this.onCheckoutPress} />
        ) : null}
      </View>
    );
  }
}

const mapState = ({item, cart}) => ({
  cart: cart.data,
  items: item.data,
  cartKey: cart.key,
  loaded: item.loading,
  isStartGroupOrder: cart.enableGroupOrderSession,
});

const mapDispatch = {
  getItem: ItemActions.getItem,
  setCartKey: CartActions.setCartKey,
  setCartItem: CartActions.setCartItem,
  setEnableGroupOrderSession: CartActions.setEnableGroupOrderSession,
};

export default connect(mapState, mapDispatch)(MerchantDetails);
