import { useApolloClient } from '@apollo/client';
import {
  Avatar,
  Box,
  Button,
  Flex,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { useMemo } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  useLogoutMutation,
  useMeQuery,
  useUploadProfileImageMutation,
} from '../../generated/graphql';
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import Notification from '../notification/Notification';

const LoggedInNavbarItem = (): JSX.Element => {
  const client = useApolloClient();
  const [logout, { loading: logoutLoading }] = useLogoutMutation();

  async function onLogoutClick() {
    try {
      await logout();
      localStorage.removeItem('access_token');
      await client.resetStore();
    } catch (e) {
      console.log(e);
    }
  }
  const [upload] = useUploadProfileImageMutation();
  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const file = e.target.files[0];
      await upload({
        variables: { file },
        update: (cache) => {
          cache.evict({ fieldName: 'me' });
        },
      });
    }
  }

  const accessToken = localStorage.getItem('access_token');
  const { data } = useMeQuery({ skip: !accessToken });
  const profileImage = useMemo(() => {
    if (data?.me?.profileImage) {
      return `${process.env.REACT_APP_API_HOST}/${data?.me?.profileImage}`;
    }
    return '';
  }, [data]);
  return (
    <Stack justify="flex-end" alignItems="center" direction="row" spacing={3}>
      <ColorModeSwitcher />
      <Notification />
      <Menu>
        <MenuButton as={Button} rounded="full" variant="link" cursor="pointer">
          <Avatar size="sm" src={profileImage} />
        </MenuButton>
        <MenuList minW={300}>
          <Flex px={4} pt={2} pb={4}>
            <label htmlFor="upload-profile-image">
              <input
                id="upload-profile-image"
                type="file"
                accept="image/*"
                hidden
                onChange={handleImageUpload}
              />
              <Avatar size="md" src={profileImage} mr={4} cursor="pointer" />
            </label>
            <Box>
              <Text fontWeight="bold">{data?.me?.username}</Text>
              <Text>{data?.me?.email}</Text>
            </Box>
          </Flex>
          <MenuItem isDisabled={logoutLoading} onClick={onLogoutClick}>
            로그아웃
          </MenuItem>
        </MenuList>
      </Menu>
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
