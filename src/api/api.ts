import UserResponse from "./UserResponse";

const corsAnywhereUrl = 'https://cors-anywhere.herokuapp.com/';

export const getUser = (username: string): Promise<UserResponse> => {
    return fetch(corsAnywhereUrl + `https://duolingo.com/users/${username}`)
        .then(response => response.json() as Promise<UserResponse>);
}