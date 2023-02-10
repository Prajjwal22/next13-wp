import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
  uri: 'https://howtoshout.com/graphql',
  cache: new InMemoryCache(),
});