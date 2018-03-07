import * as React from 'react';
import { Friend } from '../../interfaces/Friend';
import FriendItem from '../FriendItem/FriendItem';
import { List, ListSubheader } from 'material-ui';

interface FriendsListProps {
  friends: Friend[];
  onFriendSelected: (username: string) => void;
}

const FriendsList = (props: FriendsListProps) => {
  return (
    <List subheader={<ListSubheader>Friends:</ListSubheader>}>
      {props.friends.map(f => <FriendItem key={f.username} friend={f} onClick={props.onFriendSelected} />)}
    </List>
  );
};

export default FriendsList;
