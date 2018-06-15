// @flow

import { UnauthorizedError } from './errors';
import createLoaders, { type CreateLoaders } from './schema/loader';
import type { app$Request } from './types';
import type { UserDoc } from './schema/user/user.model';

class GraphQLContext {
  req: app$Request;
  loaders: $Call<CreateLoaders>;

  constructor(req: app$Request) {
    this.req = req;
    this.loaders = createLoaders();
  }

  get user(): ?UserDoc {
    return this.req.user || null;
  }

  ensureIsAuthenticated() {
    if (!this.req.user) throw UnauthorizedError();
  }
}

export default GraphQLContext;
