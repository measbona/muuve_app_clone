import {createReducer, createActions} from 'reduxsauce';
import Immutable from 'seamless-immutable';

const {Types, Creators} = createActions(
  {
    getOrderHistory: null,

    setLoaded: ['bool'],
    setLoading: ['bool'],
    setOrderHistory: ['payload'],
  },
  {prefix: 'ORDER_REDUX_'},
);

const INITIAL_STATE = Immutable({
  data: {},

  loaded: false,
  loading: false,
});

const setOrderHistoryHandler = (state = INITIAL_STATE, {payload}) =>
  state.set('data', payload);

const setLoadingHandler = (state = INITIAL_STATE, {bool}) =>
  state.set('loading', bool);

const setLoadedHandler = (state = INITIAL_STATE, {bool}) =>
  state.set('loaded', bool);

const HANDLERS = {
  [Types.SET_LOADING]: setLoadingHandler,
  [Types.SET_LOADED]: setLoadedHandler,
  [Types.SET_ORDER_HISTORY]: setOrderHistoryHandler,
};

export const OrderTypes = Types;
export const reducer = createReducer(INITIAL_STATE, HANDLERS);

export default Creators;
