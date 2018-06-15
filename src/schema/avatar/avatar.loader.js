// @flow

import DataLoader from 'dataloader';

import Avatar from './avatar.model';
import User from '../user/user.model';
import { mapTo, mapToValue } from '../../utils';

class AvatarLoader {
  avatarById = new DataLoader(ids =>
    Avatar.find({ _id: { $in: ids } }).then(mapTo(ids, x => x.id)),
  );

  avatarByUserId = new DataLoader(ids =>
    User.find({ _id: { $in: ids } }).then(
      mapToValue(ids, x => x.id, x => x.avatar),
    ),
  );
}

export default AvatarLoader;
