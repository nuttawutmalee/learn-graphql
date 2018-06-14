// @flow

import UserLoaders from './user/user.loader';

export default function createLoaders() {
  return {
    user: new UserLoaders(),
  };
}
