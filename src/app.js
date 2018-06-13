// @flow

import express from 'express';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import compression from 'compression';
import passport from 'passport';
import PrettyError from 'pretty-error';

import config from './config';
import auth from './auth';
import graphqlRoutes from './graphql';

const app = express();

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
app.use(passport.initialize());
app.use(passport.session());
app.use(helmet());

const pe = new PrettyError();
pe.skipNodeFiles();
pe.skipPackage('express');

app.use(
  (
    err: Error,
    req: express$Request,
    res: express$Response,
    next: express$NextFunction,
  ) => {
    process.stderr.write(pe.render(err));
    next();
  },
);

app.get('/health-check', (req: express$Request, res: express$Response) => {
  res.send('Server is up and running!');
});

app.use('/auth', auth);

if (config.NODE_ENV === 'production') {
  app.use(passport.authenticate('local', { session: false }), graphqlRoutes);
} else {
  app.use(graphqlRoutes);
}

export default app;
