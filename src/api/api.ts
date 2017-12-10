import UserResponse from '../interfaces/api/UserResponse';

const corsAnywhereUrl = 'https://duostats-cors.herokuapp.com/';

export const getUser = (username: string): Promise<UserResponse> => {
  return fetch(corsAnywhereUrl + `https://duolingo.com/users/${username}`).then(
    response => response.json() as Promise<UserResponse>
  );
};
