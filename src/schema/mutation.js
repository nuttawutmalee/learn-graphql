// @flow

import { GraphQLObjectType } from 'graphql';

import userMutation from './user/user.mutation';

export default new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    ...userMutation,
  },
});
