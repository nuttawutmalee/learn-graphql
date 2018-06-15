// @flow

import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLEnumType,
} from 'graphql';
import { GraphQLDate } from 'graphql-iso-date';
import { globalIdField } from 'graphql-relay';

import AvatarType from '../avatar/avatar.type';
import { nodeInterface } from '../node';
import type GraphQLContext from '../../context';

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
      type: new GraphQLNonNull(GraphQLString),
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

    avatar: {
      type: AvatarType,
      resolve: (parent: any, args: any, ctx: GraphQLContext) =>
        ctx.loaders.avatar.avatarByUserId.load(parent.id),
    },

    status: {
      type: new GraphQLNonNull(UserStatusType),
    },

    verificationToken: {
      type: GraphQLString,
    },

    createdAt: {
      type: new GraphQLNonNull(GraphQLDate),
    },

    updatedAt: {
      type: new GraphQLNonNull(GraphQLDate),
    },
  },
});
