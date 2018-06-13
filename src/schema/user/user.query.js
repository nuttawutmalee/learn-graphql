// @flow

import { GraphQLNonNull, GraphQLString, GraphQLList } from 'graphql';

import UserType from './user.type';
import type Context from '../../context';

const me = {
  type: UserType,
  resolve: (root: any, args: any, ctx: Context) =>
    ctx.user && ctx.loaders.user.userById.load(ctx.user.id),
};

const user = {
  type: UserType,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  resolve: (root: any, args: any, ctx: Context) =>
    ctx.loaders.user.userById.load(args.id),
};

const users = {
  type: new GraphQLList(UserType),
  args: {
    ids: {
      type: new GraphQLList(GraphQLNonNull(GraphQLString)),
    },
  },
  resolve: (root: any, args: any, ctx: Context) =>
    ctx.loaders.user.userById.loadMany(args.ids),
};

export default {
  me,
  user,
  users,
};
