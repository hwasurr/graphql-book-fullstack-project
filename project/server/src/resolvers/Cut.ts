import { Arg, Int, Query, Resolver, FieldResolver, Root } from 'type-graphql';
import ghibliData from '../data/ghibli';
import { Film } from '../entities/Film';
import { Cut } from '../entities/Cut';

@Resolver(Cut) 
export class CutResolver {
  @Query(() => [Cut])
  cuts(@Arg('filmId', () => Int) filmId: Film['id']): Cut[] {
    return ghibliData.cuts.filter((x) => x.filmId === filmId);
  }

  @Query(() => Cut, { nullable: true })
  cut(@Arg('cutId', () => Int) cutId: number): Cut | undefined {
    return ghibliData.cuts.find((x) => x.id === cutId);
  }

  @FieldResolver(() => Film, { nullable: true })
  Film(@Root() cut: Cut): Film | undefined {
    return ghibliData.films.find((film) => film.id === cut.filmId);
  }
}
