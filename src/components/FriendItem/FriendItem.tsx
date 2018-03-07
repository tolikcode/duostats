import * as React from 'react';
import { Friend } from '../../interfaces/Friend';
import { ListItem, Avatar, ListItemText } from 'material-ui';
import { Link } from 'react-router-dom';

interface FriendItemProps {
  friend: Friend;
  onClick: (username: string) => void;
}

const FriendItem = (props: FriendItemProps) => {
  return (
    <ListItem button onClick={() => props.onClick(props.friend.username)}>
      <Avatar src={props.friend.avatarUrl + '/medium'} />
      <ListItemText primary={props.friend.fullname} />
    </ListItem>
  );
};

export default FriendItem;
