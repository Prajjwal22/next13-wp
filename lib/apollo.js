import { ApolloClient, InMemoryCache } from '@apollo/client';
import { relayStylePagination } from '@apollo/client/utilities';


const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        posts: relayStylePagination(),
      },
    },
  },
});

export const client = new ApolloClient({
  uri: 'https://api.howtoshout.com/graphql',
  cache,
  credentials : "include"
}); 