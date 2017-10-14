import { ActionKeys } from '../constants/ActionKeys';

export type ActionTypes = SetUsernameAction;

export interface SetUsernameAction {
    type: ActionKeys.SET_USERNAME;
    username: string;
}

export const setUsername = (username: string): SetUsernameAction =>
    ({ type: ActionKeys.SET_USERNAME, username });