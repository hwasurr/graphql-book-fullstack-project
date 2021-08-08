import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { createApolloCache } from './createApolloCache';

export const createApolloClient = (): ApolloClient<NormalizedCacheObject> =>
  new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    cache: createApolloCache(),
  });
