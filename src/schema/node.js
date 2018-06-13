/* @flow */
/* eslint-disable global-require */

import { nodeDefinitions, fromGlobalId } from 'graphql-relay';

import { assignType, getType } from '../utils';

export const { nodeInterface, nodeField, nodesField } = nodeDefinitions(
  // A function that maps from a global id to an object.
  (globalId, context) => {
    const { type, id } = fromGlobalId(globalId);

    switch (type) {
      case 'User':
        return context.loaders.user.userById.load(id).then(assignType('User'));
      default:
        return null;
    }
  },
  // A function that maps from an object to a type.
  obj => {
    switch (getType(obj)) {
      case 'User':
        return require('./user/user.type').default;
      default:
        return null;
    }
  },
);
