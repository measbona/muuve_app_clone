import {createReducer, createActions} from 'reduxsauce';
import Immutable from 'seamless-immutable';

const {Types, Creators} = createActions(
  {
    initialProfile: null,
    setProfile: ['payload'],
  },
  {prefix: 'PROFILE_REDUX_'},
);

const INITIAL_STATE = Immutable({
  data: {},
  loaded: false,
});

const setProfileHandler = (state = INITIAL_STATE, {payload}) =>
  state.set('data', payload).set('loaded', true);

const HANDLERS = {
  [Types.SET_PROFILE]: setProfileHandler,
};

export const ProfileTypes = Types;
export const reducer = createReducer(INITIAL_STATE, HANDLERS);

export default Creators;
