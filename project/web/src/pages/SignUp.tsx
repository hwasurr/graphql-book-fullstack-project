import { Box, Flex, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import SignupForm from '../components/auth/SignUpForm';
import CommonLayout from '../components/CommonLayout';

function SignUp(): React.ReactElement {
  return (
    <Box bg={useColorModeValue('gray.50', 'gray.800')}>
      <CommonLayout>
        <Flex align="center" justify="center">
          <SignupForm />
        </Flex>
      </CommonLayout>
    </Box>
  );
}

export default SignUp;
