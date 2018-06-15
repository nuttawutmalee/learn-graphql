// @flow

import { GraphQLObjectType, GraphQLString, GraphQLNonNull } from 'graphql';
import { globalIdField } from 'graphql-relay';

import { nodeInterface } from '../node';

export default new GraphQLObjectType({
  name: 'Avatar',
  interfaces: [nodeInterface],
  fields: {
    id: globalIdField(),

    _id: {
      type: new GraphQLNonNull(GraphQLString),
    },

    path: {
      type: new GraphQLNonNull(GraphQLString),
    },

    filename: {
      type: new GraphQLNonNull(GraphQLString),
    },

    mimetype: {
      type: new GraphQLNonNull(GraphQLString),
    },

    encoding: {
      type: GraphQLString,
    },
  },
});
