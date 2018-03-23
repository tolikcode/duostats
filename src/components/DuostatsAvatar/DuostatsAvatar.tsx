import * as React from 'react';
import { Avatar } from 'material-ui';
import defaultAvatar from '../../assets/defaultAvatar.jpg';

export type AvatarSize = 'small' | 'medium' | 'large' | 'xlarge';

const sizes = {
  small: 24,
  medium: 40,
  large: 90,
  xlarge: 200
};

interface DuostatsAvatarProps {
  src?: string;
  size: AvatarSize;
}

const DuostatsAvatar = (props: DuostatsAvatarProps) => {
  const currentSize = sizes[props.size];

  const style = {
    width: currentSize,
    height: currentSize
  };

  return props.src ? (
    <Avatar src={`${props.src}/${props.size}`} style={style} />
  ) : (
    <Avatar src={defaultAvatar} style={style} />
  );
};

export default DuostatsAvatar;
