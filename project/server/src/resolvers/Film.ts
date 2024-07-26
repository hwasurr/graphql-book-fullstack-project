import { Arg, Field, ObjectType, Int, Query, Resolver, Root, FieldResolver } from 'type-graphql';
import ghibliData from '../data/ghibli';
import { Film } from '../entities/Film';
import { Director } from '../entities/Director';

@ObjectType()
class PaginatedFilm {
  @Field(() => [Film])
  films: Film[];

  @Field(() => Int, { nullable: true})
  cursor?: Film[ 'id' ] | null;
}

@Resolver(Film) 
export class FilmResolver {
  @Query(() => PaginatedFilm)
  films(
    @Arg( 'limit', () => Int, { nullable: true, defaultValue: 6}) limit: number,
    @Arg( 'cursor', () => Int, { nullable: true, defaultValue: 1})
    cursor: Film['id'],
  ): PaginatedFilm {
    // 너무 많은 limit 값은 6으로 제한
    const realLimit = Math.min(6, limit);

    // 커서가 없는 경우 빈 배열 배송
    if(!cursor) return { films: []};
    const cursorDataIndex = ghibliData.films.findIndex((f) => f.id === cursor);
    //올바르지 않은 커서인경우 초깃값전송
    if (cursorDataIndex === -1) return { films: [] };

    const result = ghibliData.films.slice(
      cursorDataIndex,
      cursorDataIndex + realLimit,
    );

     // 다음 커서 생성
    const nextCursor = result[result.length -1].id + 1;
    const hasNext = ghibliData.films.findIndex((f) => f.id === nextCursor) > -1;


    return {
      cursor: hasNext ? nextCursor : null,
      films: result,
    };
  }

  @Query(() => Film, { nullable: true})
  film(@Arg('filmId', () => Int) filmId: number): Film | undefined {
    return ghibliData.films.find((x) => x.id === filmId);
  }

  @FieldResolver(() => Director)
  director(@Root() parentFilm: Film): Director | undefined {
    return ghibliData.directors.find((dr) => dr.id === parentFilm.director_id);
  }
}