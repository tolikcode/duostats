import * as React from 'react';
import { Friend } from '../../interfaces/Friend';
import { ListItem, ListItemText } from 'material-ui';
import { Link } from 'react-router-dom';
import DuostatsAvatar from '../DuostatsAvatar/DuostatsAvatar';

interface FriendItemProps {
  friend: Friend;
  onClick: (username: string) => void;
}

const FriendItem = (props: FriendItemProps) => {
  return (
    <ListItem button onClick={() => props.onClick(props.friend.username)}>
      <DuostatsAvatar src={props.friend.avatarUrl} size="medium" />
      <ListItemText primary={props.friend.fullname} />
    </ListItem>
  );
};

export default FriendItem;
