// @flow

import { GraphQLNonNull, GraphQLInt } from 'graphql';
import { connectionDefinitions } from 'graphql-relay';

import UserType from './user.type';

export default connectionDefinitions({
  name: 'User',
  nodeType: UserType,
  connectionFields: {
    totalCount: {
      type: new GraphQLNonNull(GraphQLInt),
    },
  },
});
