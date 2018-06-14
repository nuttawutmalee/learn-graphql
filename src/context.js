// @flow

import type DataLoader from 'dataloader';

import { UnauthorizedError } from './errors';
import createLoaders from './schema/loader';
import type { app$Request } from './types';
import type { UserDoc } from './schema/user/user.model';

type DataLoaders = {
  [name: string]: DataLoader<any, any>,
};

type RootDataLoader = {
  [model: string]: DataLoaders,
};

class GraphQLContext {
  req: app$Request;
  loaders: RootDataLoader;

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
