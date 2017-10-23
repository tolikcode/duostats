import { ActionKeys } from '../constants/ActionKeys';

export type ActionTypes = SetMyUsernameAction;

export interface SetMyUsernameAction {
    type: ActionKeys.SET_MY_USERNAME;
    username: string;
}

export const setMyUsername = (username: string): SetMyUsernameAction =>
    ({ type: ActionKeys.SET_MY_USERNAME, username });