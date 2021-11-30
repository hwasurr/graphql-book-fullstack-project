import {
  Arg,
  Ctx,
  FieldResolver,
  Int,
  Mutation,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from 'type-graphql';
import { Cut } from '../entities/Cut';
import { Film } from '../entities/Film';
import ghibliData from '../data/ghibli';
import { isAuthenticated } from '../middlewares/isAuthenticated';
import { MyContext } from '../apollo/createApolloServer';
import { CutVote } from '../entities/CutVote';

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
  film(@Root() cut: Cut): Film | undefined {
    return ghibliData.films.find((film) => film.id === cut.filmId);
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuthenticated)
  async vote(
    @Arg('cutId', () => Int) cutId: number,
    @Ctx() { verifiedUser }: MyContext,
  ): Promise<boolean> {
    if (verifiedUser) {
      const { userId } = verifiedUser;
      const alreadyVoted = await CutVote.findOne({
        cutId,
        userId,
      });
      if (alreadyVoted) {
        await alreadyVoted.remove();
        return true;
      }
      const vote = CutVote.create({ cutId, userId });
      await vote.save();
      return true;
    }
    return false;
  }

  @FieldResolver(() => Int)
  async votesCount(
    @Root() cut: Cut,
    @Ctx() { cutVoteLoader }: MyContext,
  ): Promise<number> {
    // const count = await CutVote.count({ where: { cutId: cut.id } });
    // return count;
    const cutVotes = await cutVoteLoader.load({ cutId: cut.id });
    return cutVotes.length;
  }

  @FieldResolver(() => Boolean)
  async isVoted(
    @Root() cut: Cut,
    @Ctx() { cutVoteLoader, verifiedUser }: MyContext,
  ): Promise<boolean> {
    if (verifiedUser) {
      const votes = await cutVoteLoader.load({ cutId: cut.id });
      if (votes.some((vote) => vote.userId === verifiedUser.userId))
        return true;
      return false;
    }
    return false;
  }
}
