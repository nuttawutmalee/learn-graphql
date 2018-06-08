import Debug from 'debug';
import config from './config/app.config';
import server from './config/server.config';
import db from './config/db.config';
import graphqlRoutes from './graphql';

const debug = Debug('app:server');

server.get('/health-check', (req, res) => {
  res.send('Server is up and running!');
});

server.use(graphqlRoutes);

db.connection.on('error', () => {
  throw new Error('Unable to connect to database');
});

server.listen(config.APP_PORT || 0, () => {
  server.emit('started');
  debug(
    `Server is listening on port ${config.APP_PORT || 0} (${config.NODE_ENV})`,
  );
});
