import {createReducer, createActions} from 'reduxsauce';
import Immutable from 'seamless-immutable';

const {Types, Creators} = createActions(
  {
    setCartItem: ['payload'],
    setCartKey: ['key'],

    setEnableGroupOrderSession: ['val'],
  },
  {prefix: 'CART_REDIX_'},
);

const INITIAL_STATE = Immutable({
  data: {},
  key: null,

  enableGroupOrderSession: false,
});

const setCartItemHandler = (state = INITIAL_STATE, {payload}) =>
  state.set('data', payload);

const setCartKeyHandler = (state = INITIAL_STATE, {key}) =>
  state.set('key', key);

const setEnableGroupOrderSessionHandler = (state = INITIAL_STATE, {val}) =>
  state.set('enableGroupOrderSession', val);

const HANDLERS = {
  [Types.SET_CART_ITEM]: setCartItemHandler,
  [Types.SET_CART_KEY]: setCartKeyHandler,

  [Types.SET_ENABLE_GROUP_ORDER_SESSION]: setEnableGroupOrderSessionHandler,
};

export const CartTypes = Types;
export const reducer = createReducer(INITIAL_STATE, HANDLERS);

export default Creators;
