import { combineReducers } from 'redux';
import myUsername from './myUsername';
import { learningCharts } from './learningCharts';

export const rootReducer = combineReducers({
  myUsername,
  learningCharts
});
