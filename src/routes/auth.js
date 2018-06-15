// @flow

import { Router } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';

import config from '../config';
import { UnauthorizedError } from '../errors';
import User from '../schema/user/user.model';
import type { app$Request } from '../types';

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

  req.token = jwt.sign({ id: req.user._id }, config.APP_SECRET, {
    expiresIn: '7 days',
  });

  return next();
};

const signup = (
  req: app$Request,
  res: express$Response,
  next: express$NextFunction,
) => {
  User.signup(req.body)
    .then(user => {
      req.user = user || null;
      return next();
    })
    .catch(err => next(err));
};

const authenticate = (
  req: app$Request,
  res: express$Response,
  next: express$NextFunction,
) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err) return next(err);
    if (!user) return next(new UnauthorizedError(info.message));
    return req.login(user, { session: false }, next);
  })(req, res, next);
};

authRouter.post('/signin', authenticate, generateToken, respond);
authRouter.post('/signup', signup, generateToken, respond);

export default authRouter;
