import { ApolloProvider } from '@apollo/client';
import { ChakraProvider, theme } from '@chakra-ui/react';
import { BrowserRouter, Route } from 'react-router-dom';
import { createApolloClient } from './apollo/createApolloClient';
import Film from './pages/Film';
import Main from './pages/Main';
import SignUp from './pages/SignUp';

const apolloClient = createApolloClient();

export const App: React.FC = () => {
  return (
    <ApolloProvider client={apolloClient}>
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <Route exact path="/" component={Main} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/film/:filmId" component={Film} />
        </BrowserRouter>
      </ChakraProvider>
    </ApolloProvider>
  );
};
