import { ApolloClient, InMemoryCache } from '@apollo/client';


const cache = new InMemoryCache();

export const client = new ApolloClient({
  uri: 'https://api.howtoshout.com/graphql',
  cache,
  credentials : "include"
}); 