import Userloaders from './user.loader';

const withAuthToken = fn => token => fn(token);

const createLoaders = authToken => ({
  ...withAuthToken(Userloaders)(authToken),
});

export default createLoaders;
