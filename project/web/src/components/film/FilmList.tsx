import { useFilmsQuery } from '../../generated/graphql';

export default function FilmList(): JSX.Element {
  const { data, loading, error } = useFilmsQuery();

  if (loading) return <p> ...loading </p>;
  if (error) return <p> error.message </p>;

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
