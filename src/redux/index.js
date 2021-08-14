import {combineReducers} from 'redux';

const rootReducer = combineReducers({
  profile: require('./ProfileRedux').reducer,
  restaurant: require('./RestaurantRedux').reducer,
  item: require('./ItemRedux').reducer,
  cart: require('./CartRedux').reducer,
});

export default rootReducer;
