/* @flow */
/* eslint-disable global-require */

import { nodeDefinitions, fromGlobalId } from 'graphql-relay';

import { assignType, getType } from '../utils';
import type GraphQLContext from '../context';

export const { nodeInterface, nodeField, nodesField } = nodeDefinitions(
  // A function that maps from a global id to an object.
  (globalId, context: GraphQLContext) => {
    const { type, id } = fromGlobalId(globalId);

    switch (type) {
      case 'User':
        return context.loaders.user.userById.load(id).then(assignType('User'));
      case 'Avatar':
        return context.loaders.avatar.avatarById
          .load(id)
          .then(assignType('Avatar'));
      default:
        return null;
    }
  },
  // A function that maps from an object to a type.
  (obj: any) => {
    switch (getType(obj)) {
      case 'User':
        return require('./user/user.type').default;
      case 'Avatar':
        return require('./avatar/avatar.type').default;
      default:
        return null;
    }
  },
);
