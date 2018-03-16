import * as React from 'react';
import { Avatar } from 'material-ui';
import defaultAvatar from '../../assets/defaultAvatar.jpg';

export type AvatarSize = 'small' | 'medium' | 'large' | 'xlarge';

interface DuostatsAvatarProps {
  src?: string;
  size: AvatarSize;
}

const DuostatsAvatar = (props: DuostatsAvatarProps) => {
  return props.src ? <Avatar src={`${props.src}/${props.size}`} /> : <Avatar src={defaultAvatar} />;
};

export default DuostatsAvatar;
