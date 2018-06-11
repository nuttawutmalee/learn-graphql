import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Router } from 'express';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import User from '../models/user';

const router = Router({ caseSensitive: true });

const register = (req, res, next) => {
  const password = bcrypt.hashSync(req.body.password);
  const user = new User({ ...req.body, password });

  user
    .save()
    .then(savedUser => {
      req.user = savedUser;
      return next();
    })
    .catch(err => res.send(err));
};

const generateToken = (req, res, next) => {
  req.token = jwt.sign(
    {
      id: req.user._id,
    },
    'SUPERSECRETKEY',
    {
      expiresIn: '7 days',
    },
  );
  next();
};

const respond = (req, res) => {
  res.json({
    user: req.user,
    token: req.token,
  });
};

passport.use(
  new LocalStrategy(
    {
      session: false,
    },
    (username, password, done) => {
      User.findOne({
        $or: [{ username }, { email: username }],
      })
        .then(user => {
          if (user) {
            const pass = bcrypt.compareSync(password, user.password);

            if (pass) {
              return done(null, user);
            }

            return done(null, false, { message: 'Invalid password' });
          }

          return done(null, false, { message: 'User not found' });
        })
        .catch(err => done(err));
    },
  ),
);

router.post(
  '/login',
  passport.authenticate('local', { session: false }),
  generateToken,
  respond,
);

router.post('/register', register, generateToken, respond);

export default router;
