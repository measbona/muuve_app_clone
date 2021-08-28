/* eslint-disable dot-notation */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {connect} from 'react-redux';
import {View, ScrollView, Share, StyleSheet} from 'react-native';
import {map, get, size, reduce, find} from 'lodash';
import * as Navigator from '../../navigation/screen';
import * as Animatable from 'react-native-animatable';

import utils from '../../utils';

import NavBar from '../../lib/NavBar';
import Loading from '../../lib/Loading';
import ReadyToCheckout from './components/ReadyToCheckout';
import GroupOrderSectionInfo from './components/GroupOrderSectionInfo';
import ListParticipantItem from './components/ListParticipantItem';

import CartActions from '../../redux/CartRedux';
import ItemActions from '../../redux/ItemRedux';
import OrderActions from '../../redux/OrderRedux';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: utils.colors.lightGrey,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: utils.colors.white,
  },
});

class GroupOrderCart extends React.PureComponent {
  state = {
    mounted: false,
    loading: false,
  };

  componentDidMount() {
    const {groupOrder, itemReducer, getItem, syncGroupOrder} = this.props;

    const {group_key: groupKey} = groupOrder;
    const merchantKey = groupOrder.restaurant.key;

    if (!itemReducer[merchantKey]) {
      getItem(merchantKey);
    }

    syncGroupOrder(groupKey);

    Navigator.bindComponent(this);
  }

  componentDidAppear() {
    this.setState({mounted: true});
  }

  componentDidDisappear() {
    const {unSyncGroupOrder} = this.props;

    unSyncGroupOrder();
  }

  componentDidUpdate(prevProps) {
    const {groupOrder, componentId} = this.props;
    const {groupOrder: prevGroupOrder} = prevProps;

    if (size(groupOrder) > 0 && size(prevGroupOrder) === 0) {
      const hoster = find(
        groupOrder.joined_users,
        (user) => user.host === true,
      );

      return Navigator.showModalNotice({
        headline: 'Noticed',
        description: `${hoster.name} has checkout your order.`,
        buttonName: 'Continue',
        onPress: () => {
          Navigator.popToRoot(componentId);
        },
      });
    }
  }

  onInvite = async () => {
    const {groupOrder, profile} = this.props;

    try {
      await Share.share({
        message: `${profile.family_name} ${profile.first_name} would like to invite you to join the order.\n${groupOrder.link}`,
      });
    } catch (error) {
      alert(error.message);
    }
  };

  onEndSession = () => {
    return Navigator.showModalChoice({
      headline: 'End Session',
      description:
        'Your participants is ordering their items.\nAre you sure to terminate this session?',
      no: 'Cancel',
      yes: 'Continue',
      onPress: this.endSession,
    });
  };

  endSession = async () => {
    const {
      cart,
      profile,
      groupOrder,
      componentId,
      setCartItem,
      removeGroupOrderData,
      updateGroupOrderData,
    } = this.props;

    this.setState({loading: true});

    const currentUser = find(
      groupOrder.joined_users,
      (user) => user.key === profile.uid,
    );

    if (!currentUser.host) {
      const newGroupOrderData = {
        ...groupOrder,
        items: {
          ...groupOrder.items,
          [profile.uid]: {},
        },
        joined_users: {
          ...groupOrder.joined_users,
          [profile.uid]: {},
        },
        sub_total: groupOrder.sub_total - utils.helpers.sumCartTotal(cart),
      };

      await updateGroupOrderData(newGroupOrderData);
      await setCartItem({});
    } else {
      await removeGroupOrderData(groupOrder.group_key);
    }

    this.setState({loading: false}, () => Navigator.popToRoot(componentId));
  };

  onDecrease = (item) => {
    const {
      profile,
      groupOrder,
      componentId,
      setCartItem,
      updateGroupOrderData,
    } = this.props;

    const {uid} = profile;
    const userItems = groupOrder.items[uid];

    let newSelectedItems = null;

    if (item.quantity === 1) {
      newSelectedItems = reduce(
        userItems,
        (result, remainItem) => {
          if (remainItem.key !== item.key) {
            result[remainItem.key] = {
              key: remainItem.key,
              name: remainItem.name,
              price: remainItem.price,
              quantity: remainItem.quantity,
            };
          }

          return result;
        },
        {},
      );
    } else {
      newSelectedItems = reduce(
        userItems,
        (result, remainItem) => {
          if (remainItem.key === item.key) {
            result[remainItem.key] = {
              key: remainItem.key,
              name: remainItem.name,
              price: remainItem.price,
              quantity: remainItem.quantity - 1,
            };
          } else {
            result[remainItem.key] = {
              key: remainItem.key,
              name: remainItem.name,
              price: remainItem.price,
              quantity: remainItem.quantity,
            };
          }

          return result;
        },
        {},
      );
    }

    const subTotal = Number(
      parseFloat(groupOrder.sub_total - item.price).toFixed(2),
    );

    const newGroupOrderData = {
      ...groupOrder,
      items: {
        ...groupOrder.items,
        [uid]: newSelectedItems,
      },
      sub_total: size(newSelectedItems) === 0 ? 0 : subTotal,
    };

    if (size(newSelectedItems) === 0) {
      return Navigator.showModalNotice({
        headline: 'Noticed',
        description: 'Your cart is empty',
        buttonName: 'Back',
        onPress: () => {
          updateGroupOrderData(newGroupOrderData);
          setCartItem(newSelectedItems);

          Navigator.popBack(componentId);
        },
      });
    }

    updateGroupOrderData(newGroupOrderData);
    setCartItem(newSelectedItems);
  };

  onReadyPress = () => {
    const {groupOrder, profile, updateGroupOrderData} = this.props;
    const {uid} = profile;

    const isReady = get(groupOrder, ['joined_users', uid, 'ready'], false);

    const newGroupOrderData = {
      ...groupOrder,
      joined_users: {
        ...groupOrder.joined_users,
        [uid]: {
          ...groupOrder.joined_users[uid],
          ready: !isReady,
        },
      },
    };

    updateGroupOrderData(newGroupOrderData);
  };

  render() {
    const {mounted, loading} = this.state;
    const {componentId, groupOrder, itemReducer, profile} = this.props;

    const groupOrderItems = groupOrder.items;
    const restaurantKey = get(groupOrder, 'restaurant.key', '');
    const itemData = itemReducer[restaurantKey];

    const currentUser = find(
      groupOrder.joined_users,
      (user) => user.key === profile.uid,
    );

    const userItems = reduce(
      groupOrderItems,
      (result, items, key) => {
        if (key === profile.uid) {
          result['currentUserItems'] = {
            [key]: items,
          };
        } else {
          result['participantItems'] = {
            [key]: items,
            ...result.participantItems,
          };
        }

        return result;
      },
      {},
    );

    return (
      <View style={styles.container}>
        <NavBar
          title="Group Order Cart"
          componentId={componentId}
          style={{backgroundColor: utils.colors.yellow}}
        />
        <GroupOrderSectionInfo
          loading={loading}
          groupOrder={groupOrder}
          onInvite={this.onInvite}
          onEndSession={this.onEndSession}
        />

        {mounted ? (
          <ScrollView showsVerticalScrollIndicator={false}>
            <Animatable.View animation="fadeIn" delay={300} duration={300}>
              <ListParticipantItem
                isCurrentUser
                user={currentUser}
                itemData={itemData}
                groupOrder={groupOrder}
                onPress={this.onDecrease}
                uid={get(currentUser, 'uid', '')}
                currentUserUid={get(currentUser, 'uid', '')}
                items={
                  userItems.currentUserItems
                    ? Object.values(userItems.currentUserItems)[0]
                    : {}
                }
              />
            </Animatable.View>

            {map(userItems.participantItems, (items, uid) => {
              const user = groupOrder.joined_users[uid];

              return (
                <Animatable.View key={uid} animation="fadeIn" duration={300}>
                  <ListParticipantItem
                    uid={uid}
                    user={user}
                    items={items}
                    itemData={itemData}
                    groupOrder={groupOrder}
                    currentUserUid={get(currentUser, 'uid', '')}
                  />
                </Animatable.View>
              );
            })}
          </ScrollView>
        ) : (
          <View style={styles.loading}>
            <Loading color="yellow" style={{alignSelf: 'center'}} />
          </View>
        )}

        {!get(currentUser, 'host', false) ? (
          <ReadyToCheckout
            loading={false}
            onPress={this.onReadyPress}
            isReady={get(currentUser, 'ready', false)}
          />
        ) : null}
      </View>
    );
  }
}

const mapState = ({cart, profile, order, item}) => ({
  cart: cart.data,
  profile: profile.data,
  itemReducer: item.data,
  groupOrderLink: order.url,
  groupOrder: order.groupOrderData,
});

const mapDispatch = {
  getItem: ItemActions.getItem,
  setCartItem: CartActions.setCartItem,

  syncGroupOrder: OrderActions.syncGroupOrder,
  unSyncGroupOrder: OrderActions.unSyncGroupOrder,

  updateGroupOrderData: OrderActions.updateGroupOrderData,
  removeGroupOrderData: OrderActions.removeGroupOrderData,
};

export default connect(mapState, mapDispatch)(GroupOrderCart);
