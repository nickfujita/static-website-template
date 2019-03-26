import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import cache from './components/cache';

const rootReducer = combineReducers({
  routing: routerReducer,
  cache,
});

export default rootReducer;
