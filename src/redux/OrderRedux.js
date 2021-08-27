import {createReducer, createActions} from 'reduxsauce';
import Immutable from 'seamless-immutable';

const {Types, Creators} = createActions(
  {
    getOrderHistory: null,

    syncGroupOrder: ['groupKey'],
    unSyncGroupOrder: null,

    setLoaded: ['bool'],
    setLoading: ['bool'],
    setOrderHistory: ['payload'],

    setUrl: ['val', 'bool'],

    setGroupOrderData: ['payload'],
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

const syncGroupOrderHandler = (state = INITIAL_STATE, {groupKey}) =>
  state.set('loading', true);

const unSyncGroupOrderHandler = (state = INITIAL_STATE) =>
  state.set('loading', false);

const HANDLERS = {
  [Types.SET_URL]: setUrlHandler,

  [Types.SYNC_GROUP_ORDER]: syncGroupOrderHandler,
  [Types.UN_SYNC_GROUP_ORDER]: unSyncGroupOrderHandler,

  [Types.SET_GROUP_ORDER_DATA]: setGroupOrderDataHandler,
  [Types.UPDATE_GROUP_ORDER_DATA]: updateGroupOrderDataHandler,
  [Types.REMOVE_GROUP_ORDER_DATA]: removeGroupOrderDataHandler,

  [Types.SET_LOADED]: setLoadedHandler,
  [Types.SET_LOADING]: setLoadingHandler,
  [Types.SET_ORDER_HISTORY]: setOrderHistoryHandler,
};

export const OrderTypes = Types;
export const reducer = createReducer(INITIAL_STATE, HANDLERS);

export default Creators;
