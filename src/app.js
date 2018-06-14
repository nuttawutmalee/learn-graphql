// @flow

import express from 'express';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import compression from 'compression';
import passport from 'passport';
import errorHandler from 'strong-error-handler';

import config from './config';
import authRoutes from './auth';
import graphqlRoutes from './graphql';
import { report } from './errors';

const app = express();

// Setup passport strategies
require('./passport');

app.set('trust proxy', 'loopback');

app.use(
  cors({
    origin(origin, cb) {
      const whitelist = config.CORS_ORIGIN ? config.CORS_ORIGIN.split(',') : [];
      cb(null, whitelist.includes(origin));
    },
    credentials: true,
    maxAge: 86400,
  }),
);

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(helmet());

app.get('/health-check', (req: express$Request, res: express$Response) => {
  res.send('Server is up and running!');
});

app.use(authRoutes);

if (config.NODE_ENV === 'production') {
  app.use(passport.authenticate('jwt', { session: false }), graphqlRoutes);
} else {
  app.use(graphqlRoutes);
}

app.use(
  (
    err: Error,
    req: express$Request,
    res: express$Response,
    next: express$NextFunction,
  ) => {
    report(err);
    next(err);
  },
);

app.use(
  errorHandler({
    debug: config.NODE_ENV !== 'production',
    log: false,
  }),
);

export default app;
