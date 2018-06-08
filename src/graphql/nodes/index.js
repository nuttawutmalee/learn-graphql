import UserQueries from './user/user.queries';
import UserMutations from './user/user.mutations';

export default {
  queries: {
    ...UserQueries,
  },
  mutations: {
    ...UserMutations,
  },
};
