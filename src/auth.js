// @flow

import { Router } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { Strategy as LocalStrategy } from 'passport-local';

import config from './config';
import User, { type UserDoc } from './schema/user/user.model';
import type { app$Request } from './type-definition';

const authRouter = Router({ caseSensitive: true });

const respond = (req: app$Request, res: express$Response) => {
  res.json({ user: req.user, token: req.token });
};

const generateToken = (
  req: app$Request,
  res: express$Response,
  next: express$NextFunction,
) => {
  if (typeof req.user === 'undefined' || !req.user) {
    const err = new Error('Authenticated user not found.');
    return next(err);
  }

  req.token = jwt.sign({ id: req.user._id }, config.APP || 'SUPERSECRETKEY', {
    expiresIn: '7 days',
  });

  return next();
};

const register = (
  req: app$Request,
  res: express$Response,
  next: express$NextFunction,
) => {
  const user = new User(req.body);

  user
    .save()
    .then((savedUser: UserDoc) => {
      req.user = savedUser || null;
      return next();
    })
    .catch((err: Error) => next(err));
};

const verify = (
  username: string,
  password: string,
  done: (err: any, user?: any, options?: { message: string }) => void,
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
};

passport.use(new LocalStrategy({ session: false }, verify));

authRouter.post(
  '/login',
  passport.authenticate('local', { session: false }),
  generateToken,
  respond,
);

authRouter.post('/register', register, generateToken, respond);

export default authRouter;
