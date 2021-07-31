import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { Box, ChakraProvider, Text, theme } from '@chakra-ui/react';
import * as React from 'react';
import FilmList from './components/film/FilmList';
// import { PaginatedFilms } from './generated/graphql';

const apolloClient = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache({
    // typePolicies: {
    //   Query: {
    //     fields: {
    //       films: {
    //         keyArgs: false,
    //         merge(
    //           existing: PaginatedFilms | undefined,
    //           incoming: PaginatedFilms,
    //         ): PaginatedFilms {
    //           return {
    //             cursor: incoming.cursor,
    //             films: existing
    //               ? [...existing.films, ...incoming.films]
    //               : incoming.films,
    //           };
    //         },
    //       },
    //     },
    //   },
    // },
  }),
});

export const App: React.FC = () => {
  return (
    <ApolloProvider client={apolloClient}>
      <ChakraProvider theme={theme}>
        <Box>
          <Text>Ghibli GraphQL</Text>
        </Box>

        <FilmList />
      </ChakraProvider>
    </ApolloProvider>
  );
};
