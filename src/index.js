// @flow

import Debug from 'debug';

import config from './config';
import app from './app';
import db, { connectDatabase } from './db';
import { report } from './errors';

const debug = Debug('app:server');

(async () => {
  try {
    const info = await connectDatabase();
    debug(`Database connected at ${info.host}:${info.port}/${info.name}.`);
  } catch (err) {
    debug('Unable to connect to database.');
    process.exit(1);
  }

  const { APP_HOST, APP_PORT } = config;

  const server = app.listen(Number(APP_PORT), APP_HOST, () => {
    debug(`Server is listenting on http://${APP_HOST}:${APP_PORT}/`);
  });

  // Shutdown NodeJS gracefully.
  const handleExit = (options, err?: any) => {
    if (options.cleanup) {
      const actions = [db.disconnect];

      if (server) {
        actions.push(server.close);
      }

      actions.forEach((close, i) => {
        try {
          close(() => {
            if (i === actions.length - 1) process.exit();
          });
        } catch (e) {
          if (i === actions.length - 1) process.exit();
        }
      });
    }
    if (err) report(err);
    if (options.exit) process.exit();
  };

  process.on('exit', handleExit.bind(null, { cleanup: true }));
  process.on('SIGINT', handleExit.bind(null, { exit: true }));
  process.on('SIGTERM', handleExit.bind(null, { exit: true }));
  process.on('uncaughtException', handleExit.bind(null, { exit: true }));
})();
