import { Box, Flex, Heading, Image, Tag, Text } from '@chakra-ui/react';
import { FilmQuery } from '../../generated/graphql';

interface FilmDetailProps {
  film?: FilmQuery['film'];
}

export default function FilmDetail({
  film,
}: FilmDetailProps): React.ReactElement {
  return (
    <Flex
      mt={12}
      flexDirection={{ base: 'column', md: 'row' }}
      alignItems="center"
    >
      <Box maxW={250} flex={1}>
        <Image src={film?.posterImg} borderRadius={20} />
      </Box>

      <Flex
        flex={1}
        ml={{ base: 0, md: 6 }}
        flexDirection="column"
        alignContent="center"
        justify="center"
        alignItems="flex-start"
      >
        <Flex mt={2}>
          {film?.genre.split(',').map((genre) => (
            <Tag key={genre} mr={2} size="sm">
              {genre}
            </Tag>
          ))}
        </Flex>
        <Heading mb={4}>
          {film?.title}
          {film?.release ? `(${new Date(film?.release).getFullYear()})` : null}
        </Heading>
        <Heading size="md" mb={2}>
          {film?.subtitle}
        </Heading>
        <Text mb={2}>
          {film?.director.name}
          {' • '}
          {!film ? '' : `${film?.runningTime} 분`}
        </Text>
        <Text fontSize="sm">{film?.description}</Text>
      </Flex>
    </Flex>
  );
}
