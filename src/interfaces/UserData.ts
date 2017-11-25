import UserResponse from './api/UserResponse';

export default interface UserData {
    isFetching: boolean;
    username: string;
    data?: UserResponse;
    error?: string;
}