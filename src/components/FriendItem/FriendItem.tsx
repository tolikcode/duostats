import * as React from 'react';
import { Friend } from '../../interfaces/Friend';
import { ListItem, Avatar, ListItemText } from 'material-ui';

const FriendItem = (props: Friend) => {
  return (
    <ListItem button>
      <Avatar src={props.avatarUrl + '/medium'} />
      <ListItemText primary={props.fullname} />
    </ListItem>
  );
};

export default FriendItem;
