import {createReducer, createActions} from 'reduxsauce';
import Immutable from 'seamless-immutable';

const {Types, Creators} = createActions(
  {
    appInitial: null,
    handleDynamicLink: null,
  },
  {prefix: 'APP_REDUX_'},
);

const INITIAL_STATE = Immutable({});

const HANDLERS = {};

export const AppTypes = Types;
export const reducer = createReducer(INITIAL_STATE, HANDLERS);

export default Creators;
