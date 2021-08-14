import {createReducer, createActions} from 'reduxsauce';
import Immutable from 'seamless-immutable';

const {Types, Creators} = createActions(
  {
    getItem: ['merchantKey'],

    setItem: ['payload'],
    setLoading: ['bool'],
  },
  {prefix: 'ITEM_REDUX_'},
);

const INITIAL_STATE = Immutable({
  data: {},
  loading: false,
});

const setItemHandler = (state = INITIAL_STATE, {payload}) =>
  state.set('data', payload);

const setLoadingHandler = (state = INITIAL_STATE, {bool}) =>
  state.set('loading', bool);

const HANDLERS = {
  [Types.SET_ITEM]: setItemHandler,
  [Types.SET_LOADING]: setLoadingHandler,
};

export const ItemTypes = Types;
export const reducer = createReducer(INITIAL_STATE, HANDLERS);

export default Creators;
