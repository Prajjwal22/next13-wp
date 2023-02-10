import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
  uri: 'https://www.saintlad.com/graphql',
  cache: new InMemoryCache(),
});