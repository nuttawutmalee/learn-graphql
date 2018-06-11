import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLEnumType,
} from 'graphql';
import { GraphQLDate } from 'graphql-iso-date';
import AvatarType from '../avatar/avatar.type';

const UserStatusType = new GraphQLEnumType({
  name: 'UserStatus',
  values: ['ACTIVE', 'INACTIVE', 'PENDING', 'BLOCKED'],
});

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    _id: { type: GraphQLString },
    username: {
      type: new GraphQLNonNull(GraphQLString),
    },
    email: {
      type: new GraphQLNonNull(GraphQLString),
    },
    password: {
      type: new GraphQLNonNull(GraphQLString),
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    avatar: { type: AvatarType },
    status: { type: UserStatusType },
    verificationToken: { type: GraphQLString },
    createdAt: { type: GraphQLDate },
    updatedAt: { type: GraphQLDate },
  }),
});

export const UserInput = new GraphQLInputObjectType({
  name: 'UserInput',
  fields: () => ({
    username: {
      type: new GraphQLNonNull(GraphQLString),
    },
    email: {
      type: new GraphQLNonNull(GraphQLString),
    },
    password: {
      type: new GraphQLNonNull(GraphQLString),
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    avatar: { type: AvatarType },
  }),
});

export default UserType;
