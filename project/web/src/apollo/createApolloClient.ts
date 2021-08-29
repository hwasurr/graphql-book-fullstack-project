import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { createApolloCache } from './createApolloCache';

const errorLink = onError(
  ({ graphQLErrors, networkError, forward, operation }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message, locations, path }) =>
        // eslint-disable-next-line no-console
        console.log(
          `[GraphQL error]: -> ${operation.operationName} 
        Message: ${message}, Query: ${path}, Location: ${JSON.stringify(
            locations,
          )}`,
        ),
      );
    }

    if (networkError) {
      // eslint-disable-next-line no-console
      console.log(`[networkError]: -> ${operation.operationName}
    Message: ${networkError.message}`);
    }
  },
);

export const createApolloClient = (): ApolloClient<NormalizedCacheObject> =>
  new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    cache: createApolloCache(),
  });
