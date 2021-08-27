/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {connect} from 'react-redux';
import {View, FlatList, Animated, StyleSheet} from 'react-native';
import {get, size, find} from 'lodash';
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

import CartActions from '../../redux/CartRedux';
import ItemActions from '../../redux/ItemRedux';
import OrderActions from '../../redux/OrderRedux';

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
  flatList: {marginTop: 40},
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

  onPreview = () => {
    const {componentId} = this.props;

    Navigator.goToGroupOrderCart(componentId);
  };

  onEndSession = () => {
    const {removeGroupOrderData, groupOrderKey} = this.props;

    Navigator.showModalChoice({
      headline: 'End Session',
      description:
        'Your participants is ordering their items. Are you sure to terminate this session?',
      no: 'Cancel',
      yes: 'Continue',
      onPress: () => removeGroupOrderData(groupOrderKey),
    });
  };

  onGroupOrderPress = () => {
    const {componentId, restaurant, cartKey} = this.props;

    Navigator.showModalChoice({
      headline: 'Group Order',
      description:
        'Share your group order link with others.\nThey can add their favorite items.\nCheckout and get it all delivered together.',
      no: 'Cancel',
      yes: 'Start Group Order',
      onPress: () => {
        if (cartKey && cartKey !== restaurant.key) {
          Navigator.dismissOverLay();

          return Navigator.showModalNotice({
            headline: 'Noticed',
            description:
              'You can only make group order from the store you have already ordered in the card.',
            buttonName: 'Cancel',
          });
        }

        return Navigator.goToGroupOrder(componentId, {restaurant});
      },
    });
  };

  onItemPress = async (item, itemKey) => {
    const {selectedItems} = this.state;
    const {
      cartKey,
      profile,
      restaurant,
      setCartKey,
      groupOrder,
      setCartItem,
      isStartGroupOrder,
      updateGroupOrderData,
    } = this.props;

    let newSelectedItems = null;
    const restaurantKey = restaurant.key;
    const isIncreaseQuantity = Boolean(selectedItems[itemKey]);
    const {uid} = profile;

    if (cartKey && cartKey !== restaurant.key) {
      return Navigator.showModalNotice({
        headline: 'Noticed',
        description: isStartGroupOrder
          ? "You can't make order with different store of your group order."
          : "You can't make order with multiple stores.",
        buttonName: 'Cancel',
      });
    }

    if (isIncreaseQuantity) {
      const selectedItem = selectedItems[item.key];
      newSelectedItems = {
        ...selectedItems,
        [selectedItem.key]: {
          ...selectedItem,
          quantity: selectedItem.quantity + 1,
        },
      };
    } else {
      newSelectedItems = {
        ...selectedItems,
        [itemKey]: {
          quantity: 1,
          key: itemKey,
          name: item.name,
          price: item.current_price,
        },
      };
    }

    if (isStartGroupOrder) {
      const newGroupOrderData = {
        ...groupOrder,
        items: {
          ...groupOrder.items,
          [uid]: newSelectedItems,
        },
        sub_total: Number(
          parseFloat(groupOrder.sub_total + item.current_price).toFixed(2),
        ),
      };

      updateGroupOrderData(newGroupOrderData);
    }

    if (!cartKey) {
      setCartKey(restaurantKey);
    }

    this.setState({selectedItems: newSelectedItems});
    setCartItem(newSelectedItems);
  };

  renderHeaderComponent = () => {
    const {isStartGroupOrder, restaurant, groupOrder, profile} = this.props;

    const merchantName = get(restaurant, 'name', 'N/A');
    const isParticipant = !get(
      groupOrder,
      ['joined_users', profile.uid, 'host'],
      false,
    );

    return (
      <Animatable.View animation="fadeIn" duration={300}>
        <MerchantInfoSection merchantName={merchantName} />
        <GroupOrder
          onPreview={this.onPreview}
          isParticipant={isParticipant}
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
    const {restaurant, items, cart} = this.props;

    const itemsCount = size(items[restaurant.key]);
    const isSelectedItem = selectedItems[item.key];
    const isLastItem = itemsCount === index + 1;

    return (
      <React.Fragment key={item.key}>
        <Item
          cart={cart}
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
    const {
      cart,
      items,
      loaded,
      profile,
      groupOrder,
      restaurant,
      componentId,
    } = this.props;

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

    const isParticipant = !get(
      groupOrder,
      ['joined_users', profile.uid, 'host'],
      false,
    );

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
            <Loading color="yellow" style={{alignSelf: 'center'}} />
          </View>
        )}

        {mounted && size(cart) > 0 && !isParticipant ? (
          <CheckoutBottomSheet cart={cart} onPress={this.onCheckoutPress} />
        ) : null}
      </View>
    );
  }
}

const mapState = ({profile, item, cart, order}) => ({
  cart: cart.data,
  items: item.data,
  cartKey: cart.key,
  loaded: item.loading,
  profile: profile.data,
  groupOrder: order.groupOrderData,
  isStartGroupOrder: order.groupOrderEnabled,
  groupOrderKey: order.groupOrderData.group_key,
});

const mapDispatch = {
  getItem: ItemActions.getItem,
  setCartKey: CartActions.setCartKey,
  setCartItem: CartActions.setCartItem,
  updateGroupOrderData: OrderActions.updateGroupOrderData,
  removeGroupOrderData: OrderActions.removeGroupOrderData,
};

export default connect(mapState, mapDispatch)(MerchantDetails);
