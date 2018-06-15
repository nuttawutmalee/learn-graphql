// @flow

import { GraphQLString } from 'graphql';
import { GraphQLUpload } from 'apollo-upload-server';
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
  displayName: {
    type: GraphQLString,
  },
  avatar: {
    type: GraphQLUpload,
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
    User.signup(input)
      .then(user => ctx.loaders.user.userById.load(user.id))
      .then(user => ({ user })),
});

export default {
  createUser,
};
