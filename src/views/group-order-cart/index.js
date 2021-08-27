/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {connect} from 'react-redux';
import {View, ScrollView, Share, StyleSheet} from 'react-native';
import {map, get, size, reduce} from 'lodash';
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
    const {groupOrder, itemReducer, getItem} = this.props;

    const merchantKey = groupOrder.restaurant.key;

    if (!itemReducer[merchantKey]) {
      getItem(merchantKey);
    }

    Navigator.bindComponent(this);
  }

  componentDidAppear() {
    this.setState({mounted: true});
  }

  onInvite = async () => {
    const {groupOrderLink, profile} = this.props;

    const {link} = groupOrderLink;

    try {
      await Share.share({
        message: `${profile.family_name} ${profile.first_name} would like to invite you to join the order.\n${link}`,
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
      componentId,
      removeGroupOrderData,
      groupOrder: {group_key},
    } = this.props;

    this.setState({loading: true});
    await removeGroupOrderData(group_key);
    this.setState({loading: false});

    Navigator.popToRoot(componentId);
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

    const newGroupOrderData = {
      ...groupOrder,
      joined_users: {
        ...groupOrder.joined_users,
        [uid]: {
          ...groupOrder.joined_users[uid],
          ready: true,
        },
      },
    };

    updateGroupOrderData(newGroupOrderData);
  };

  render() {
    const {mounted, loading} = this.state;
    const {componentId, groupOrder, itemReducer, profile} = this.props;
    const {uid: uuid} = profile;

    const groupOrderItems = groupOrder.items;
    const restaurantKey = get(groupOrder, 'restaurant.key', '');
    const isParticipant = !get(
      groupOrder,
      ['joined_users', uuid, 'host'],
      false,
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

        {!loading && mounted ? (
          <ScrollView showsVerticalScrollIndicator={false}>
            {map(groupOrderItems, (items, uid) => {
              const itemData = itemReducer[restaurantKey];
              const isHoster = groupOrder.joined_users[uid].host;

              const participantName =
                !isHoster && groupOrder.joined_users[uid].name;
              const isReady = !isHoster && groupOrder.joined_users[uid].ready;

              return (
                <Animatable.View key={uid} animation="fadeIn" duration={300}>
                  <ListParticipantItem
                    uuid={uuid}
                    items={items}
                    isReady={isReady}
                    groupOrderUid={uid}
                    itemData={itemData}
                    isHoster={isHoster}
                    onPress={this.onDecrease}
                    participantName={participantName}
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

        {isParticipant ? (
          <ReadyToCheckout loading={false} onPress={this.onReadyPress} />
        ) : null}
      </View>
    );
  }
}

const mapState = ({profile, order, item}) => ({
  profile: profile.data,
  itemReducer: item.data,
  groupOrderLink: order.url,
  groupOrder: order.groupOrderData,
});

const mapDispatch = {
  getItem: ItemActions.getItem,
  setCartItem: CartActions.setCartItem,
  updateGroupOrderData: OrderActions.updateGroupOrderData,
  removeGroupOrderData: OrderActions.removeGroupOrderData,
};

export default connect(mapState, mapDispatch)(GroupOrderCart);
