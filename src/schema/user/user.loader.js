// @flow

import DataLoader from 'dataloader';

import User from './user.model';
import { mapTo } from '../../utils';

class UserLoader {
  userById = new DataLoader(ids =>
    User.find({ _id: { $in: ids } }).then(
      mapTo(ids, x => {
        this.userByUsername.prime(x.username, x);
        return x.id;
      }),
    ),
  );

  userByUsername = new DataLoader(usernames =>
    User.find({ username: { $in: usernames } }).then(
      mapTo(usernames, x => {
        this.userById.prime(x.id, x);
        return x.username;
      }),
    ),
  );
}

export default UserLoader;
