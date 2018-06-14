// @flow

import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLEnumType,
} from 'graphql';
import { GraphQLDate } from 'graphql-iso-date';
import { globalIdField } from 'graphql-relay';

import { nodeInterface } from '../node';

export const UserStatusType = new GraphQLEnumType({
  name: 'UserStatus',
  values: {
    ACTIVE: {},
    INACTIVE: {},
    PENDING: {},
    BLOCKED: {},
  },
});

export default new GraphQLObjectType({
  name: 'User',
  interfaces: [nodeInterface],
  fields: {
    id: globalIdField(),

    _id: {
      type: GraphQLString,
    },

    username: {
      type: new GraphQLNonNull(GraphQLString),
    },

    email: {
      type: new GraphQLNonNull(GraphQLString),
    },

    password: {
      type: new GraphQLNonNull(GraphQLString),
    },

    displayName: {
      type: new GraphQLNonNull(GraphQLString),
    },

    status: {
      type: UserStatusType,
    },

    verificationToken: {
      type: GraphQLString,
    },

    createdAt: {
      type: GraphQLDate,
    },

    updatedAt: {
      type: GraphQLDate,
    },
  },
});
