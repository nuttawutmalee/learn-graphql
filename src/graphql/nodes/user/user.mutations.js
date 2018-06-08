import { GraphQLNonNull } from 'graphql';
import User from '../../../models/user';
import UserType, { UserInput } from './user.type';

const createUser = {
  type: UserType,
  args: {
    user: {
      type: new GraphQLNonNull(UserInput),
    },
  },
  resolve: async (root, { user }) => User.create({ ...user }),
};

export default {
  createUser,
};
