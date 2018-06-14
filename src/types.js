// @flow

import type { UserDoc } from './schema/user/user.model';

declare export class app$Request extends express$Request {
  // Auth
  user: ?UserDoc;
  token: ?string;

  // Passport
  login(user: any, done: (err: any) => void): void;
  login(user: any, options: any, done: (err: any) => void): void;
  logIn(user: any, done: (err: any) => void): void;
  logIn(user: any, options: any, done: (err: any) => void): void;

  logout(): void;
  logOut(): void;

  isAuthenticated(): boolean;
  isUnauthenticated(): boolean;
}
