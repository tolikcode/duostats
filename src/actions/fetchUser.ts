import { ActionKeys } from '../constants/ActionKeys';
import UserResponse from '../interfaces/api/UserResponse';
import { Dispatch } from 'redux';
import { ActionTypes } from './ActionTypes';
import { getUser } from '../api/api';

export interface RequestUserAction {
    type: ActionKeys.REQUEST_USER;
    username: string;
}

export interface ReceiveUserAction {
    type: ActionKeys.RECEIVE_USER;
    username: string;
    userData?: UserResponse;
    error: string;
}

const requestUser = (username: string): RequestUserAction => ({
    type: ActionKeys.REQUEST_USER,
    username
});

const receiveUser = (username: string, userData?: UserResponse, error: string = ''): ReceiveUserAction => ({
    type: ActionKeys.RECEIVE_USER,
    username,
    userData,
    error
});

export const fetchUser = (username: string) => (dispatch: Dispatch<ActionTypes>) => {
    dispatch(requestUser(username));
    return getUser(username)
        .then(user => dispatch(receiveUser(username, user)))
        .catch(err => dispatch(receiveUser(username, undefined, err.toString())));
};