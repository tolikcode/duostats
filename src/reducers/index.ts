import { combineReducers } from 'redux';
import myUsername from './myUsername';
import { users } from './users';
import { learningCharts } from './learningCharts';

export const rootReducer = combineReducers({
  myUsername,
  users,
  learningCharts
});

