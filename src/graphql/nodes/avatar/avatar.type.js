import { GraphQLObjectType, GraphQLString } from 'graphql';

const AvatarType = new GraphQLObjectType({
  name: 'Avatar',
  fields: () => ({
    data: GraphQLString,
    contentType: GraphQLString,
  }),
});

export default AvatarType;
