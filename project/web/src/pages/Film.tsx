import { Box, Spinner, Text } from '@chakra-ui/react';
import React from 'react';
import { useParams } from 'react-router-dom';
import CommonLayout from '../components/CommonLayout';
import FilmCutList from '../components/film-cut/FilmCutList';
import FilmDetail from '../components/film/FIlmDetail';
import { useFilmQuery } from '../generated/graphql';

interface FilmPageParams {
  filmId: string;
}

function Film(): React.ReactElement {
  const { filmId } = useParams<FilmPageParams>();
  const { data, loading, error } = useFilmQuery({
    variables: { filmId: Number(filmId) },
  });

  return (
    <CommonLayout>
      {loading && <Spinner />}
      {error && <Text>페이지를 표시할 수 없습니다.</Text>}
      {filmId && data?.film ? (
        <>
          <FilmDetail film={data.film} />
          <Box mt={12}>
            <FilmCutList filmId={data.film.id} />
          </Box>
        </>
      ) : (
        <Text>페이지를 표시할 수 없습니다.</Text>
      )}
    </CommonLayout>
  );
}

export default Film;
