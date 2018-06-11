import Promise from 'bluebird';
import Debug from 'debug';
import mongoose from 'mongoose';

import config from './app.config';

const debug = Debug('app:config:db');
const options = {
  user: config.DB_USER || '',
  pass: config.DB_PASS || '',
  keepAlive: 120,
};

// Use bluebird Promise for mongoose Promise based APIs
mongoose.Promise = Promise;

mongoose.connect(
  config.DB_HOST || 'mongodb://localhost:27017/local',
  options,
);

if (debug.enabled) {
  mongoose.set('debug', (collectionName, method, query, doc) => {
    debug(`${collectionName}.${method}`, doc);
  });
}

mongoose.connection.once('open', () => {
  debug('Database connection successfully!');
});

export default mongoose;
