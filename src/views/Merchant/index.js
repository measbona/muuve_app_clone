import React from 'react';
import {connect} from 'react-redux';
import {map, get, filter, reduce, size} from 'lodash';
import styled from 'styled-components/native';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import {
  goToGroupOrder,
  showModalChoice,
  goToCheckout,
  showModalNotice,
} from '../../navigation/screen';

import ItemActions from '../../redux/ItemRedux';
import CartActions from '../../redux/CartRedux';

import Device from '../../utils/device';
import Colors from '../../utils/colors';

import Item from './components/Item';
import SearchBar from './components/SearchBar';
import NavigationBack from '../../lib/NavigationBack';
import CheckoutBottomSheet from './components/CheckoutBottomSheet';

const Container = styled.View`
  flex: 1;
  position: relative;
`;

const ScrollView = styled.ScrollView``;

const Content = styled.View`
  flex: 1;
`;

const Divider = styled.View`
  border-width: 1px;
  margin-vertical: 15px;
  margin-horizontal: 20px;
  border-color: ${Colors.grey};
`;

const GroupOrderWrapper = styled.View`
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 16px;
  align-items: flex-start;
`;

const CategoryWrapper = styled.View`
  margin-left: 16px;
  flex-direction: row;
`;

const Button = styled.TouchableOpacity`
  margin-right: 10px;
  border-radius: 50px;
  flex-direction: row;
  align-items: center;
  padding-vertical: 7px;
  padding-horizontal: 15px;
  background-color: ${Colors.grey};
`;

const ButtonText = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: ${Colors.blue};
`;

const BannerWrapper = styled.View`
  position: relative;
`;

const Image = styled.Image`
  height: ${150}px;
  resize-mode: cover;
  width: ${Device.screenWidth}px;
`;

class Merchant extends React.PureComponent {
  constructor(props) {
    super(props);

    const {cart} = props;

    this.state = {
      selectedItems: cart || {},
    };
  }

  componentDidMount() {
    const {items, restaurant, getItem} = this.props;
    const merchantKey = restaurant.key;

    if (!items[merchantKey]) {
      getItem(merchantKey);
    }
  }

  onCheckoutPress = () => {
    const {componentId} = this.props;

    goToCheckout(componentId);
  };

  onEndSession = () => {
    const {setEnableGroupOrderSession} = this.props;

    showModalChoice({
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

    showModalChoice({
      headline: 'Group Order',
      description:
        'Share your group order link with others. They can add their favorite items. Checkout and get it all delivered together.',
      no: 'Cancel',
      yes: 'Start Group Order',
      onPress: () => {
        setEnableGroupOrderSession(true);
        goToGroupOrder(componentId, {merchant});
      },
    });
  };

  onItemPress = async (item, itemKey) => {
    const {selectedItems} = this.state;
    const {setCartItem, restaurant, setCartKey, cartKey} = this.props;

    const restaurantKey = restaurant.key;
    const removeItem = Boolean(selectedItems[itemKey]);

    if (cartKey && cartKey !== restaurant.key) {
      return showModalNotice({
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
        [itemKey]: {key: itemKey, name: item.name, price: item.current_price},
      };

      this.setState({selectedItems: newSelectedItems});
      setCartItem(newSelectedItems);
      setCartKey(restaurantKey);
    }
  };

  render() {
    const {selectedItems} = this.state;
    const {
      componentId,
      restaurant,
      items,
      cart,
      isStartGroupOrder,
    } = this.props;

    const merchantName = get(restaurant, 'name', 'N/A');
    const banner = get(restaurant, 'images.banner');

    return (
      <Container>
        <NavigationBack
          title={merchantName}
          navigate
          componentId={componentId}
        />

        <BannerWrapper>
          <Image source={{uri: banner}} />
        </BannerWrapper>

        <GroupOrderWrapper>
          {!isStartGroupOrder ? (
            <Button activeOpacity={0.5} onPress={this.onGroupOrderPress}>
              <MIcon
                name="group-add"
                size={20}
                color={Colors.blue}
                style={{marginRight: 5}}
              />
              <ButtonText>Group Order</ButtonText>
            </Button>
          ) : (
            <Button activeOpacity={0.5} onPress={this.onEndSession}>
              <MIcon
                name="exit-to-app"
                size={18}
                color={Colors.blue}
                style={{marginRight: 5}}
              />
              <ButtonText>End Session</ButtonText>
            </Button>
          )}
        </GroupOrderWrapper>

        <CategoryWrapper>
          <ScrollView horizontal showHorizontalScrollIndicator={false}>
            <Button activeOpacity={0.5}>
              <ButtonText>Menu</ButtonText>
              <MIcon name="keyboard-arrow-down" color={Colors.blue} size={20} />
            </Button>
            <Button activeOpacity={0.5}>
              <ButtonText>Editor's Choice</ButtonText>
            </Button>
            <Button activeOpacity={0.5}>
              <ButtonText>Drink</ButtonText>
            </Button>
            <Button activeOpacity={0.5}>
              <ButtonText>Other</ButtonText>
            </Button>
          </ScrollView>
        </CategoryWrapper>

        <Content>
          <SearchBar />
          <ScrollView showVerticalScrollIndicator={false}>
            {map(items[restaurant.key], (item, key) => {
              const isSelectedItem = selectedItems[key];

              return (
                <React.Fragment key={key}>
                  <Item
                    isSelectedItem={isSelectedItem}
                    item={item}
                    onPress={() => this.onItemPress(item, key)}
                  />
                  <Divider />
                </React.Fragment>
              );
            })}
          </ScrollView>
        </Content>

        {size(cart) > 0 ? (
          <CheckoutBottomSheet cart={cart} onPress={this.onCheckoutPress} />
        ) : null}
      </Container>
    );
  }
}

const mapState = ({item, cart}) => ({
  cart: cart.data,
  cartKey: cart.key,
  items: item.data,
  isStartGroupOrder: cart.enableGroupOrderSession,
});

const mapDispatch = {
  getItem: ItemActions.getItem,
  setCartItem: CartActions.setCartItem,
  setCartKey: CartActions.setCartKey,
  setEnableGroupOrderSession: CartActions.setEnableGroupOrderSession,
};

export default connect(mapState, mapDispatch)(Merchant);
