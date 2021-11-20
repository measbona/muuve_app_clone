/* eslint-disable dot-notation */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import moment from 'moment';
import {connect} from 'react-redux';
import {View, ScrollView, Share, StyleSheet} from 'react-native';
import {map, get, omit, size, reduce, find} from 'lodash';
import * as Navigator from '../../navigation/screen';
import * as Animatable from 'react-native-animatable';

import utils from '../../utils';

import NavBar from '../../lib/NavBar';
import Loading from '../../lib/Loading';
import ReadyToCheckout from './components/ReadyToCheckout';
import ExpiredCountDown from './components/ExpiredCountDown';
import GroupOrderSectionInfo from './components/GroupOrderSectionInfo';
import ListParticipantItem from './components/ListParticipantItem';

import CartActions from '../../redux/CartRedux';
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
  constructor(props) {
    super(props);

    const {groupOrder} = props;

    this.state = {
      remaining: 0,
      mounted: false,
      loading: false,
      isLeftSession: false,
      data: groupOrder || {},
    };
  }

  static getDerivedStateFromProps(props, state) {
    const {data} = state;
    const {groupOrder} = props;

    if (groupOrder !== data) {
      return {data: groupOrder};
    }

    return null;
  }

  componentDidMount() {
    clearInterval(this.timer);

    this.calculateRemaining();

    Navigator.bindComponent(this);
  }

  componentDidAppear() {
    const {data} = this.state;
    const {syncGroupOrder} = this.props;

    this.setState({mounted: true});

    // syncGroupOrder(data.group_key);
  }

  // componentDidDisappear() {
  //   const {unSyncGroupOrder} = this.props;

  //   unSyncGroupOrder();
  // }

  componentDidUpdate(prevProps) {
    const {data, isLeftSession, remaining} = this.state;
    const {profile, componentId, setCartKey, setCartItem} = this.props;
    const {groupOrder: prevGroupOrder} = prevProps;

    const hoster = find(
      prevGroupOrder.joined_users,
      (user) => user.host === true,
    );

    const hostName = get(hoster, 'name', 'N/A');
    const currentUser = find(
      prevGroupOrder.joined_users,
      (user) => user.key === profile.uid,
    );

    const isParticipant = !get(currentUser, 'host', false);

    if (
      (isParticipant &&
        size(prevGroupOrder) > 0 &&
        size(data) === 0 &&
        !isLeftSession) ||
      remaining === 0
    ) {
      return Navigator.showModalNotice({
        headline: 'Noticed',
        description: `${hostName} has checkout the order.`,
        buttonName: 'Continue',
        onPress: async () => {
          await setCartKey(null);
          await setCartItem({});

          Navigator.popToRoot(componentId);
        },
      });
    }
  }

  calculateRemaining = () => {
    const {data} = this.state;

    const now = moment();
    const willExpired = moment(Number(data.expired_at));
    const remaining = willExpired.diff(now, 'seconds');

    this.setState({remaining}, this.countdown);
  };

  countdown = () => {
    this.timer = setInterval(() => {
      const {remaining} = this.state;

      if (remaining > 0) {
        this.setState({remaining: remaining - 1});
      } else {
        this.setState({remaining: 0});
      }
    }, 1000);
  };

  onInvite = async () => {
    const {data} = this.state;
    const {profile} = this.props;

    try {
      await Share.share({
        message: `${profile.family_name} ${profile.first_name} would like to invite you to join the order.\n${data.link}`,
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
    const {data} = this.state;
    const {
      profile,
      setCartKey,
      componentId,
      setCartItem,
      removeGroupOrderData,
      participantLeftGroup,
    } = this.props;

    this.setState({loading: true, isLeftSession: true});

    const currentUser = find(
      data.joined_users,
      (user) => user.key === profile.uid,
    );

    if (!currentUser.host) {
      await participantLeftGroup({uid: profile.uid, groupKey: data.group_key});
    } else {
      await removeGroupOrderData(data.group_key);
    }

    await setCartKey(null);
    await setCartItem({});
    this.setState({loading: false}, () => Navigator.popToRoot(componentId));
  };

  onDecrease = async (item) => {
    const {data} = this.state;
    const {
      profile,
      componentId,
      setCartItem,
      participantUpdateItem,
    } = this.props;

    let newSelectedItems = {};

    const {quantity, removeItem} = await Navigator.showItemDetail({
      item,
      type: 'remove-item',
    });

    if (removeItem) {
      newSelectedItems = omit(data.items[profile.uid], item.key);
    } else {
      newSelectedItems = data.items[profile.uid] = {
        ...data.items[profile.uid],
        [item.key]: {
          ...item,
          quantity,
        },
      };
    }

    const payload = {
      uid: profile.uid,
      data: newSelectedItems,
      groupKey: data.group_key,
    };

    participantUpdateItem(payload);

    if (size(newSelectedItems) === 0) {
      return Navigator.showModalNotice({
        headline: 'Noticed',
        description: 'Your cart is empty',
        buttonName: 'Back',
        onPress: () => {
          Navigator.popBack(componentId);
        },
      });
    }

    setCartItem(newSelectedItems);
  };

  onReadyPress = () => {
    const {data} = this.state;
    const {profile, participantReady} = this.props;

    const isReady = get(data, ['joined_users', profile.uid, 'ready'], false);

    const payload = {
      val: !isReady,
      uid: profile.uid,
    };

    participantReady(payload);
  };

  render() {
    const {data, mounted, loading, remaining} = this.state;
    const {componentId, profile} = this.props;

    const groupOrderItems = data.items;

    const currentUser = find(
      data.joined_users,
      (user) => user.key === profile.uid,
    );

    const userItems = reduce(
      groupOrderItems,
      (result, items, key) => {
        if (size(items) > 0) {
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
          groupOrder={data}
          onInvite={this.onInvite}
          onEndSession={this.onEndSession}
        />
        <ExpiredCountDown remaining={remaining} />

        {mounted ? (
          <ScrollView showsVerticalScrollIndicator={false}>
            <Animatable.View animation="fadeIn" delay={300} duration={300}>
              <ListParticipantItem
                isCurrentUser
                user={currentUser}
                groupOrder={data}
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
              const user = data.joined_users[uid];

              return (
                <Animatable.View key={uid} animation="fadeIn" duration={300}>
                  <ListParticipantItem
                    uid={uid}
                    user={user}
                    items={items}
                    groupOrder={data}
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
  groupOrderLink: order.url,
  groupOrder: order.groupOrderData,
});

const mapDispatch = {
  setCartKey: CartActions.setCartKey,
  setCartItem: CartActions.setCartItem,

  syncGroupOrder: OrderActions.syncGroupOrder,
  unSyncGroupOrder: OrderActions.unSyncGroupOrder,

  updateGroupOrderData: OrderActions.updateGroupOrderData,
  removeGroupOrderData: OrderActions.removeGroupOrderData,

  participantReady: OrderActions.participantReady,
  participantLeftGroup: OrderActions.participantLeftGroup,
  participantUpdateItem: OrderActions.participantUpdateItem,
};

export default connect(mapState, mapDispatch)(GroupOrderCart);
