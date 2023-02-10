import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
  uri: 'https://saintlad.com/graphql',
  cache: new InMemoryCache(),
});