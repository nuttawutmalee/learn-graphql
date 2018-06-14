// @flow

import passport from 'passport';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
import { Strategy as LocalStrategy } from 'passport-local';

import config from './config';
import User, { type UserDoc } from './schema/user/user.model';

passport.use(
  new LocalStrategy(
    {
      session: false,
    },
    (
      username: string,
      password: string,
      done: (err: any, user?: any, options?: any) => void,
    ) => {
      User.findOne({
        $or: [{ username }, { email: username }],
      })
        .then((user: ?UserDoc) => {
          if (!user) {
            return done(null, false, { message: 'User not found' });
          }

          const pass = user.checkPassword(password);

          if (!pass) {
            return done(null, false, { message: 'Invalid password' });
          }

          return done(null, user);
        })
        .catch((err: Error) => done(err));
    },
  ),
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.APP_SECRET,
    },
    (jwtPayload: any, done: (err: any, user?: any, options?: any) => void) => {
      User.findById(jwtPayload.id)
        .then((user: ?UserDoc) => {
          if (!user) {
            return done(null, false, { message: 'User not found' });
          }

          return done(null, user);
        })
        .catch((err: Error) => done(err));
    },
  ),
);
