import {createReducer, createActions} from 'reduxsauce';
import Immutable from 'seamless-immutable';

import {omit} from 'lodash';

const {Types, Creators} = createActions(
  {
    getOrderHistory: null,

    syncGroupOrder: ['groupKey'],
    unSyncGroupOrder: null,

    setLoaded: ['bool'],
    setLoading: ['bool'],
    setOrderHistory: ['payload'],

    setUrl: ['val', 'bool'],

    removeParticipant: null,
    setGroupOrderData: ['payload'],
    getGroupOrderData: ['groupKey'],

    participantReady: ['payload'],
    participantLeftGroup: ['payload'],
    participantUpdateItem: ['payload'],

    updateGroupOrderData: ['payload'],
    removeGroupOrderData: ['groupKey'],
  },
  {prefix: 'ORDER_REDUX_'},
);

const INITIAL_STATE = Immutable({
  url: '',

  data: {},
  groupOrderData: {},

  loaded: false,
  loading: false,
  groupOrderEnabled: false,
});

const setOrderHistoryHandler = (state = INITIAL_STATE, {payload}) =>
  state.set('data', payload);

const setLoadingHandler = (state = INITIAL_STATE, {bool}) =>
  state.set('loading', bool);

const setLoadedHandler = (state = INITIAL_STATE, {bool}) =>
  state.set('loaded', bool);

const setUrlHandler = (state = INITIAL_STATE, {val, bool}) =>
  state.set('url', val).set('groupOrderEnabled', bool);

const setGroupOrderDataHandler = (state = INITIAL_STATE, {payload}) =>
  state.set('groupOrderData', payload);

const updateGroupOrderDataHandler = (state = INITIAL_STATE, {payload}) =>
  state.set('groupOrderData', payload);

const removeGroupOrderDataHandler = (state = INITIAL_STATE, {groupKey}) =>
  state.set('groupOrderData', {});

const syncGroupOrderHandler = (state = INITIAL_STATE) =>
  state.set('loading', true);

const unSyncGroupOrderHandler = (state = INITIAL_STATE) =>
  state.set('loading', false);

const removeParticipantHandler = (state = INITIAL_STATE) =>
  state
    .set('url', '')
    .set('groupOrderData', {})
    .set('groupOrderEnabled', false);

const participantUpdateItemHandler = (state = INITIAL_STATE, {payload}) =>
  state.setIn(['groupOrderData', 'items', payload.uid], payload.data);

const participantReadyHandler = (state = INITIAL_STATE, {payload}) =>
  state.setIn(
    ['groupOrderData', 'joined_users', payload.uid, 'ready'],
    payload.val,
  );

const participantLeftGroupHandler = (state = INITIAL_STATE, {payload}) =>
  state
    .set('groupOrderData', omit(state.groupOrderData.items, payload.uid))
    .set('groupOrderData', omit(state.groupOrderData.joined_users, payload.uid))
    .set('url', '')
    .set('groupOrderData', {})
    .set('groupOrderEnabled', false);

const HANDLERS = {
  [Types.SET_URL]: setUrlHandler,

  [Types.SYNC_GROUP_ORDER]: syncGroupOrderHandler,
  [Types.UN_SYNC_GROUP_ORDER]: unSyncGroupOrderHandler,

  [Types.REMOVE_PARTICIPANT]: removeParticipantHandler,
  [Types.SET_GROUP_ORDER_DATA]: setGroupOrderDataHandler,
  [Types.UPDATE_GROUP_ORDER_DATA]: updateGroupOrderDataHandler,
  [Types.REMOVE_GROUP_ORDER_DATA]: removeGroupOrderDataHandler,

  [Types.PARTICIPANT_READY]: participantReadyHandler,
  [Types.PARTICIPANT_LEFT_GROUP]: participantLeftGroupHandler,
  [Types.PARTICIPANT_UPDATE_ITEM]: participantUpdateItemHandler,

  [Types.SET_LOADED]: setLoadedHandler,
  [Types.SET_LOADING]: setLoadingHandler,
  [Types.SET_ORDER_HISTORY]: setOrderHistoryHandler,
};

export const OrderTypes = Types;
export const reducer = createReducer(INITIAL_STATE, HANDLERS);

export default Creators;
