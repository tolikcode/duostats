import { ActionTypes } from '../actions/ActionTypes';
import { ActionKeys } from '../constants/ActionKeys';

const myUsername = (state = '', action: ActionTypes) => {
  switch (action.type) {
    case ActionKeys.SET_MY_USERNAME:
      return action.username;
    default:
      return state;
  }
};

export default myUsername;
