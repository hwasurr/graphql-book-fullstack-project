import {
  Avatar,
  Box,
  Button,
  Flex,
  Link,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';
import { useMemo } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useMeQuery } from '../../generated/graphql';
import { ColorModeSwitcher } from '../ColorModeSwitcher';

const LoggedInNavbarItem = (): JSX.Element => {
  return (
    <Stack justify="flex-end" alignItems="center" direction="row" spacing={3}>
      <ColorModeSwitcher />
      <Avatar size="sm" />
    </Stack>
  );
};

export default function Navbar(): JSX.Element {
  const accessToken = localStorage.getItem('access_token');
  const { data } = useMeQuery({ skip: !accessToken });
  const isLoggedIn = useMemo(() => {
    if (accessToken) return data?.me?.id;
    return false;
  }, [accessToken, data?.me?.id]);

  return (
    <Box
      zIndex={10}
      position="fixed"
      w="100%"
      bg={useColorModeValue('white', 'gray.800')}
      borderBottom={1}
      borderStyle="solid"
      borderColor={useColorModeValue('gray.200', 'gray.700')}
      py={{ base: 2 }}
      px={{ base: 4 }}
    >
      <Flex
        maxW={960}
        color={useColorModeValue('gray.600', 'white')}
        minH="60px"
        align="center"
        m="auto"
      >
        <Flex flex={{ base: 1, md: 'auto' }}>
          <Link
            as={RouterLink}
            to="/"
            fontFamily="heading"
            fontWeight="bold"
            color={useColorModeValue('gray.800', 'white')}
          >
            GhibliBestCut
          </Link>
        </Flex>

        {isLoggedIn ? (
          <LoggedInNavbarItem />
        ) : (
          <Stack justify="flex-end" direction="row" spacing={6}>
            <ColorModeSwitcher />
            <Button
              fontSize="sm"
              fontWeight={400}
              variant="link"
              as={RouterLink}
              to="/login"
            >
              로그인
            </Button>
            <Button
              display={{ base: 'none', md: 'inline-flex' }}
              fontSize="sm"
              fontWeight={600}
              href="/signup"
              colorScheme="teal"
              as={RouterLink}
              to="/signup"
            >
              시작하기
            </Button>
          </Stack>
        )}
      </Flex>
    </Box>
  );
}
