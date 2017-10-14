import { combineReducers } from 'redux';
import { ActionTypes } from '../actions/index';
import { ActionKeys } from '../constants/ActionKeys';

const username = (state = '', action: ActionTypes) => {
    switch (action.type) {
        case ActionKeys.SET_USERNAME:
            return action.username;
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    username
});

export default rootReducer;
