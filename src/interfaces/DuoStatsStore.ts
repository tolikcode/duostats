import UserFetch from './UserFetch';

export default interface DuoStatsStore {
  myUsername: string;
  userFetchs: UserFetch[];
};
