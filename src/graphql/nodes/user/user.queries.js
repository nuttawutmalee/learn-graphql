import { GraphQLString, GraphQLList, GraphQLNonNull } from 'graphql';
import UserType from './user.type';

const user = {
  type: UserType,
  args: {
    username: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: (root, args, { loaders }) =>
    loaders.users.byUsernameLoader.load(args.username),
};

const users = {
  type: new GraphQLList(UserType),
  args: {
    usernames: {
      type: new GraphQLNonNull(GraphQLList(GraphQLNonNull(GraphQLString))),
    },
  },
  resolve: (root, args, { loaders }) =>
    loaders.users.byUsernameLoader.loadMany(args.usernames),
};

export default {
  user,
  users,
};
