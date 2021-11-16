import { Box, Flex, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import LoginForm from '../components/auth/LoginForm';
import CommonLayout from '../components/CommonLayout';

function Login(): React.ReactElement {
  return (
    <Box bg={useColorModeValue('gray.50', 'gray.800')}>
      <CommonLayout>
        <Flex align="center" justify="center">
          <LoginForm />
        </Flex>
      </CommonLayout>
    </Box>
  );
}

export default Login;
