import { combineReducers } from 'redux';
import myUsername from './myUsername';
import userFetchs from './userFetchs';

const rootReducer = combineReducers({
    myUsername,
    userFetchs
});

export default rootReducer;
