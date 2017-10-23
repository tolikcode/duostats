import { combineReducers } from 'redux';
import { ActionTypes } from '../actions/index';
import { ActionKeys } from '../constants/ActionKeys';

const myUsername = (state = '', action: ActionTypes) => {
    switch (action.type) {
        case ActionKeys.SET_MY_USERNAME:
            return action.username;
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    myUsername
});

export default rootReducer;
