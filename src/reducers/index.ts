import { combineReducers } from 'redux';
import myUsername from './myUsername';
import usersData from './usersData';

const rootReducer = combineReducers({
    myUsername,
    usersData
});

export default rootReducer;
