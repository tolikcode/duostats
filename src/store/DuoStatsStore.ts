import UserData from './UserData';

export default interface DuoStatsStore {
    myUsername: string;
    usersData: UserData[];
}