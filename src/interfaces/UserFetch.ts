import UserResponse from './api/UserResponse';

export default interface UserFetch {
  isFetching: boolean;
  username: string;
  data?: UserResponse;
  error?: string;
};
