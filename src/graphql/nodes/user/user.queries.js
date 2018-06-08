import { GraphQLString, GraphQLList, GraphQLNonNull } from 'graphql';
import User from '../../../models/user';
import UserType from './user.type';

const user = {
  type: UserType,
  args: {
    username: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: (root, args, { UserLoader }) => UserLoader.load(args.username),
};

const users = {
  type: new GraphQLList(UserType),
  args: {
    username: { type: GraphQLString },
    email: { type: GraphQLString },
  },
  resolve: (root, args) => User.find(args).then(result => result),
};

export default {
  user,
  users,
};
