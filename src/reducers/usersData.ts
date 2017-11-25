import { ActionTypes } from '../actions/ActionTypes';
import { ActionKeys } from '../constants/ActionKeys';
import UserData from '../interfaces/UserData';

const usersData = (state: UserData[] = [], action: ActionTypes) => {
    switch (action.type) {
        case ActionKeys.REQUEST_USER:
            {
                const users = state.filter(u => u.username !== action.username);
                users.push({ isFetching: true, username: action.username });
                return users;
            }
        case ActionKeys.RECEIVE_USER:
            {
                const users = state.filter(u => u.username !== action.username);
                users.push({
                    isFetching: false,
                    username: action.username,
                    data: action.userData,
                    error: action.error
                });
                return users;
            }
        default:
            return state;
    }
};

export default usersData;