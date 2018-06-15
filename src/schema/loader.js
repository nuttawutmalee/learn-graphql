// @flow

import UserLoaders from './user/user.loader';
import AvatarLoaders from './avatar/avatar.loader';

export type CreateLoaders = () => {
  user: UserLoaders,
  avatar: AvatarLoaders,
};

export default function createLoaders() {
  return {
    user: new UserLoaders(),
    avatar: new AvatarLoaders(),
  };
}
