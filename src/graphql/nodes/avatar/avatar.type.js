import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInputObjectType,
} from 'graphql';

const AvatarType = new GraphQLObjectType({
  name: 'Avatar',
  fields: () => ({
    data: { type: GraphQLString },
    contentType: { type: GraphQLString },
  }),
});

export const AvatarInputType = new GraphQLInputObjectType({
  name: 'AvatarInput',
  fields: () => ({
    data: { type: GraphQLString },
    contentType: { type: GraphQLString },
  }),
});

export default AvatarType;
