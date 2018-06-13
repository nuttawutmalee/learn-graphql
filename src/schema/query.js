// @flow

import { GraphQLObjectType } from 'graphql';

import UserQueries from './user/user.query';
import { nodeField, nodesField } from './node';

export default new GraphQLObjectType({
  name: 'Query',
  fields: {
    node: nodeField,
    nodes: nodesField,
    ...UserQueries,
  },
});
