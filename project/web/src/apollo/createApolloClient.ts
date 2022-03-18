import {
  ApolloClient,
  from,
  fromPromise,
  NormalizedCacheObject,
  split,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { createUploadLink } from 'apollo-upload-client';
import { refreshAccessToken } from './auth';
import { createApolloCache } from './createApolloCache';

let apolloClient: ApolloClient<NormalizedCacheObject>;

const errorLink = onError(
  // eslint-disable-next-line consistent-return
  ({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      if (graphQLErrors.find((err) => err.message === 'access token expired')) {
        return fromPromise(refreshAccessToken(apolloClient, operation))
          .filter((result) => !!result)
          .flatMap(() => forward(operation));
      }

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

const authLink = setContext((request, prevContext) => {
  const accessToken = localStorage.getItem('access_token');
  return {
    headers: {
      ...prevContext.headers,
      Authorization: accessToken ? `Bearer ${accessToken}` : '',
    },
  };
});

const httpUploadLink = createUploadLink({
  uri: `${process.env.REACT_APP_API_HOST}/graphql`,
  fetchOptions: {
    credentials: 'include',
  },
});

const wsLink = new WebSocketLink({
  uri: `${process.env.REACT_APP_API_SUBSCRIPTION_HOST}/graphql`,
  options: {
    reconnect: true,
    connectionParams: () => {
      const accessToken = localStorage.getItem('access_token');
      return {
        Authorization: accessToken ? `Bearer ${accessToken}` : '',
      };
    },
  },
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  from([wsLink]),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  from([authLink, errorLink, httpUploadLink as any]),
);

export const createApolloClient = (): ApolloClient<NormalizedCacheObject> => {
  apolloClient = new ApolloClient({
    cache: createApolloCache(),
    uri: `${process.env.REACT_APP_API_HOST}/graphql`,
    link: splitLink,
  });
  return apolloClient;
};
