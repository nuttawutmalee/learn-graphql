import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { Router } from 'express';
import schema from './schema';
import { createLoaders } from './loaders';

const middlewares = [
  bodyParser.json(),
  bodyParser.text({ type: 'application/graphql' }),
  (req, res, next) => {
    if (req.is('application/graphql')) {
      req.body = { query: req.body };
    }
    next();
  },
];

const graphqlRouter = Router();

graphqlRouter.use(
  '/graphql',
  ...middlewares,
  graphqlExpress(req => ({
    schema,
    graphiql: true,
    context: {
      Loaders: createLoaders(req.token),
    },
  })),
);

graphqlRouter.use(
  '/graphiql',
  graphiqlExpress({
    endpointURL: '/graphql',
  }),
);

export default graphqlRouter;
