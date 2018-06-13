// @flow

import { GraphQLSchema } from 'graphql';

import RootQuery from './query';
import RootMutation from './mutation';
import RootSubscription from './subscription';

export default new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
  subscription: RootSubscription,
});
