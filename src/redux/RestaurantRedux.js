import {createReducer, createActions} from 'reduxsauce';
import Immutable from 'seamless-immutable';

const {Types, Creators} = createActions(
  {
    getRestaurants: null,

    setRestaurants: ['payload'],
    setLoaded: ['bool'],
  },
  {prefix: 'RESTAURANT_REDUX_'},
);

const INITIAL_STATE = Immutable({
  data: {},
  loaded: false,
});

const setRestaurantsHandler = (state = INITIAL_STATE, {payload}) =>
  state.set('data', payload);

const setLoadedHandler = (state = INITIAL_STATE, {bool}) =>
  state.set('loaded', bool);

const HANDLERS = {
  [Types.SET_RESTAURANTS]: setRestaurantsHandler,
  [Types.SET_LOADED]: setLoadedHandler,
};

export const RestaurantTypes = Types;
export const reducer = createReducer(INITIAL_STATE, HANDLERS);

export default Creators;
