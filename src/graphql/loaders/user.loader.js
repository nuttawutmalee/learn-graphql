import DataLoader from 'dataloader';
import { groupBy } from 'lodash';
import User from '../../models/user';

export const UserByUsernameLoader = new DataLoader(async usernames => {
  try {
    const users = await User.find({ username: { $in: usernames } });
    const userGroup = groupBy(users, 'username');

    return usernames.map(username => {
      const user = userGroup[username][0] || null;
      if (user) {
        UserByIDLoader.prime(user.id, user);
      }
      return user;
    });
  } catch (err) {
    throw err;
  }
});

export const UserByIDLoader = new DataLoader(async ids => {
  try {
    const users = await User.find({ _id: { $in: ids } });
    const userGroup = groupBy(users, '_id');

    return ids.map(id => {
      const user = userGroup[id][0] || null;
      if (user) {
        UserByUsernameLoader.prime(user.username, user);
      }
      return user;
    });
  } catch (err) {
    throw err;
  }
});

export default {
  
}