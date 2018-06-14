// @flow

import { GraphQLString } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';

import User from './user.model';
import UserType from './user.type';
import type GraphQLContext from '../../context';

const inputFields = {
  username: {
    type: GraphQLString,
  },
  email: {
    type: GraphQLString,
  },
  password: {
    type: GraphQLString,
  },
  name: {
    type: GraphQLString,
  },
};

const outputFields = {
  user: {
    type: UserType,
  },
};

const createUser = mutationWithClientMutationId({
  name: 'CreateUser',
  inputFields,
  outputFields,
  mutateAndGetPayload: (input: any, ctx: GraphQLContext) =>
    User.create(input)
      .then(user => ctx.loaders.user.userById.load(user.id))
      .then(user => ({ user })),
});

export default {
  createUser,
};
