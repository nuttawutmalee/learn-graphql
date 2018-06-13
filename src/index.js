// @flow

import Debug from 'debug';

import config from './config';
import app from './app';
import connectDatabase from './db';

const debug = Debug('app:server');

(async () => {
  try {
    const info = await connectDatabase();
    debug(`Database connected at ${info.host}:${info.port}/${info.name}.`);
  } catch (err) {
    debug('Unable to connect to database.');
    process.exit(1);
  }

  app.listen(Number(config.APP_PORT) || 0, () => {
    debug(`Server now listening on port ${config.APP_PORT || 0}`);
  });
})();
