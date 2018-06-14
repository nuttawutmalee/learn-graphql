// @flow

import { GraphQLObjectType } from 'graphql';

import userQueries from './user/user.query';
import { nodeField, nodesField } from './node';

export default new GraphQLObjectType({
  name: 'Query',
  fields: {
    node: nodeField,
    nodes: nodesField,
    ...userQueries,
  },
});
