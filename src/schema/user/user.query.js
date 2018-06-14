// @flow

import { GraphQLNonNull, GraphQLString } from 'graphql';
// import {
//   connectionArgs,
//   connectionFromPromisedArray,
//   cursorToOffset,
// } from 'graphql-relay';

import UserType from './user.type';
// import UserConnection from './user.connection';
import type GraphQLContext from '../../context';

const me = {
  type: UserType,
  resolve: (root: any, args: any, ctx: GraphQLContext) =>
    ctx.user && ctx.loaders.user.userById.load(ctx.user.id),
};

const user = {
  type: UserType,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  resolve: (root: any, args: any, ctx: GraphQLContext) =>
    ctx.loaders.user.userById.load(args.id),
};

// const users = {
//   type: UserConnection.connectionType,
//   args: connectionArgs,
//   resolve: (root: any, args: any, ctx: GraphQLContext) => {

//   },
// };

export default {
  me,
  user,
};
