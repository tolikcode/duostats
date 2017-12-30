import { ActionTypes } from '../actions/ActionTypes';
import { ActionKeys } from '../constants/ActionKeys';
import { LearningChartData } from '../interfaces/LearningChartData';
import { UserResponse } from '../interfaces/api/UserResponse';

export const users = (state: UserResponse[] = [], action: ActionTypes) => {
  switch (action.type) {
    case ActionKeys.SAVE_USER: {
      const usersState = state.filter(u => u.username === action.user.username);
      usersState.push(action.user);
      return usersState;
    }
    default:
      return state;
  }
};
