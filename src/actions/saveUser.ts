import { ActionKeys } from '../constants/ActionKeys';
import { UserResponse } from '../interfaces/api/UserResponse';
import { Dispatch } from 'redux';
import { ActionTypes } from './ActionTypes';
import { getUser } from '../api/api';
import { LearningInterval } from '../interfaces/LearningInterval';
import { IntervalOptions } from '../interfaces/IntervalOptions';

export interface SaveUserAction {
  type: ActionKeys.SAVE_USER;
  user: UserResponse;
}

export const saveUser = (user: UserResponse): SaveUserAction => {
  return { type: ActionKeys.SAVE_USER, user };
};
