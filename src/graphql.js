// @flow

import bodyParser from 'body-parser';
import { Router } from 'express';
import { printSchema } from 'graphql';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { apolloUploadExpress } from 'apollo-upload-server';

import GraphQLContext from './context';
import schema from './schema';
import config from './config';
import type { app$Request } from './types';

const helperMiddlewares = [
  bodyParser.json(),
  bodyParser.text({ type: 'application/graphql' }),
  (req: app$Request, res: express$Response, next: express$NextFunction) => {
    if (req.is('application/graphql')) {
      req.body = { query: req.body };
    }
    next();
  },
];

const graphqlRouter = Router();

graphqlRouter.use(
  '/graphql',
  ...helperMiddlewares,
  apolloUploadExpress(),
  graphqlExpress((req: app$Request) => ({
    schema,
    context: new GraphQLContext(req),
    graphiql: config.NODE_ENV !== 'production',
    pretty: config.NODE_ENV !== 'production',
  })),
);

if (config.NODE_ENV !== 'production') {
  graphqlRouter.get(
    '/graphiql',
    graphiqlExpress({
      endpointURL: '/graphql',
    }),
  );

  graphqlRouter.get(
    '/graphiql/schema',
    (req: express$Request, res: express$Response) => {
      res.type('text/plain').send(printSchema(schema));
    },
  );
}

export default graphqlRouter;
