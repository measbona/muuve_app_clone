import {combineReducers} from 'redux';

const rootReducer = combineReducers({
  item: require('./ItemRedux').reducer,
  cart: require('./CartRedux').reducer,
  order: require('./OrderRedux').reducer,
  profile: require('./ProfileRedux').reducer,
  restaurant: require('./RestaurantRedux').reducer,
});

export default rootReducer;
