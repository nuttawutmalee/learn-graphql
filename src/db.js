// @flow

import Promise from 'bluebird';
import Debug from 'debug';
import mongoose from 'mongoose';

import config from './config';

const debug = Debug('app:db');

export function connectDatabase() {
  return new Promise((resolve, reject) => {
    // Use bluebird Promise for mongoose Promise based APIs
    mongoose.Promise = Promise;

    mongoose.connection
      .on('err', err => reject(err))
      .on('close', () => debug('Database connection closed.'))
      .once('open', () => resolve(mongoose.connections[0]));

    mongoose.connect(
      config.DB_HOST,
      {
        user: config.DB_USER,
        pass: config.DB_PASS,
        dbName: config.DB_NAME,
        keepAlive: 120,
      },
    );
  });
}

export default mongoose;
