// @flow

import { UnauthorizedError } from './errors';
import type { app$Request } from './type-definition';

// TODO: new loaders
const createLoaders = () => null;

class Context {
  req: app$Request;
  loaders: any;

  constructor(req: app$Request) {
    this.req = req;
    this.loaders = createLoaders();
  }

  get user(): $ElementType<app$Request, 'user'> {
    return this.req.user || null;
  }

  get token(): $ElementType<app$Request, 'token'> {
    return this.req.token || null;
  }

  ensureIsAuthenticated() {
    if (!this.req.user) throw UnauthorizedError();
  }
}

export default Context;
