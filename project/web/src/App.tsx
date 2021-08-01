import { ApolloProvider } from '@apollo/client';
import { Box, ChakraProvider, Text, theme } from '@chakra-ui/react';
import * as React from 'react';
import { createApolloClient } from './apollo/createApolloClient';
import FilmList from './components/film/FilmList';

const apolloClient = createApolloClient();

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
