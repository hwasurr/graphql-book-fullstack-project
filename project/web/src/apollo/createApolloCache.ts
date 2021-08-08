import { InMemoryCache } from '@apollo/client';
import { PaginatedFilms } from '../generated/graphql';

export const createApolloCache = (): InMemoryCache => {
  return new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          films: {
            keyArgs: false,
            merge: (
              existing: PaginatedFilms | undefined,
              incoming: PaginatedFilms,
            ): PaginatedFilms => {
              return {
                cursor: incoming.cursor,
                films: existing
                  ? [...existing.films, ...incoming.films]
                  : incoming.films,
              };
            },
          },
        },
      },
    },
  });
};
