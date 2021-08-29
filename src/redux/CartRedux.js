import {createReducer, createActions} from 'reduxsauce';
import Immutable from 'seamless-immutable';

const {Types, Creators} = createActions(
  {
    setCartKey: ['key'],
    setCartItem: ['payload'],
  },
  {prefix: 'CART_REDIX_'},
);

const INITIAL_STATE = Immutable({
  data: {},

  key: null,
});

const setCartItemHandler = (state = INITIAL_STATE, {payload}) =>
  state.set('data', payload);

const setCartKeyHandler = (state = INITIAL_STATE, {key}) =>
  state.set('key', key);

const HANDLERS = {
  [Types.SET_CART_ITEM]: setCartItemHandler,
  [Types.SET_CART_KEY]: setCartKeyHandler,
};

export const CartTypes = Types;
export const reducer = createReducer(INITIAL_STATE, HANDLERS);

export default Creators;
