// @flow

import type { $Request } from 'express';
import type { UserDoc } from './schema/user/user.model';

export type app$Request = $Request & {
  user: ?UserDoc,
  token: ?string,
};
