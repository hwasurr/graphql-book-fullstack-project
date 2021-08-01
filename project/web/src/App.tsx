import { ApolloProvider } from '@apollo/client';
import { ChakraProvider, theme } from '@chakra-ui/react';
import { BrowserRouter, Route } from 'react-router-dom';
import { createApolloClient } from './apollo/createApolloClient';
import Main from './pages/Main';

const apolloClient = createApolloClient();

export const App: React.FC = () => {
  return (
    <ApolloProvider client={apolloClient}>
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <Route exact path="/" component={Main} />
        </BrowserRouter>
      </ChakraProvider>
    </ApolloProvider>
  );
};
