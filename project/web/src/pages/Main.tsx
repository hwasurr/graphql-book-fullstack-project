import { Flex, Heading } from '@chakra-ui/react';
import CommonLayout from '../components/CommonLayout';
import FilmList from '../components/film/FilmList';

export default function Main(): React.ReactElement {
  return (
    <CommonLayout>
      <Flex justify="space-between">
        <Heading size="lg">최고의 장면을 찾아보세요</Heading>
      </Flex>
      <FilmList />
    </CommonLayout>
  );
}
