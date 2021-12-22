import { IsInt, IsString } from 'class-validator';
import {
  Arg,
  Args,
  ArgsType,
  Ctx,
  Field,
  FieldResolver,
  InputType,
  Int,
  Mutation,
  Query,
  Resolver,
  ResolverInterface,
  Root,
  UseMiddleware,
} from 'type-graphql';
import { Not } from 'typeorm';
import { MyContext } from '../apollo/createApolloServer';
import { CutReview } from '../entities/CutReview';
import User from '../entities/User';
import { isAuthenticated } from '../middlewares/isAuthenticated';

@InputType()
class CreateOrUpdateCutReviewInput {
  @Field(() => Int, { description: '명장면 번호' })
  @IsInt()
  cutId: number;

  @Field({ description: '감상평 내용' })
  @IsString()
  contents: string;
}

@ArgsType()
class PaginationArgs {
  @Field(() => Int, { defaultValue: 2 })
  take: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => Int) cutId: number;
}

@Resolver(CutReview)
export class CutReviewResolver implements ResolverInterface<CutReview> {
  @Mutation(() => CutReview, { nullable: true })
  @UseMiddleware(isAuthenticated)
  async createOrUpdateCutReview(
    @Arg('cutReviewInput') cutReviewInput: CreateOrUpdateCutReviewInput,
    @Ctx() { verifiedUser }: MyContext,
  ): Promise<CutReview | null> {
    if (!verifiedUser) return null;
    const { contents, cutId } = cutReviewInput;
    // cutId에 대한 기존 감상평 조회
    const prevCutReview = await CutReview.findOne({
      where: { cutId, user: { id: verifiedUser.userId } },
    });

    // cutId에 대한 기존 감상평 있는 경우
    if (prevCutReview) {
      prevCutReview.contents = contents;
      return prevCutReview.save();
    }
    // cutId에 대한 기존 감상평 없는 경우
    const cutReview = CutReview.create({
      contents: cutReviewInput.contents,
      cutId: cutReviewInput.cutId,
      user: {
        id: verifiedUser.userId,
      },
    });
    return cutReview.save();
  }

  // 필드리졸버 User
  @FieldResolver(() => User)
  async user(@Root() cutReview: CutReview): Promise<User> {
    return (await User.findOne(cutReview.userId))!;
  }

  @FieldResolver(() => Boolean)
  isMine(
    @Root() cutReview: CutReview,
    @Ctx() { verifiedUser }: MyContext,
  ): boolean {
    if (!verifiedUser) return false;
    return cutReview.userId === verifiedUser.userId;
  }

  @Query(() => [CutReview])
  async cutReviews(
    @Args() { take, skip, cutId }: PaginationArgs,
    @Ctx() { verifiedUser }: MyContext,
  ): Promise<CutReview[]> {
    let realTake = 2;
    let reviewHistory: CutReview | undefined;
    if (verifiedUser && verifiedUser.userId) {
      reviewHistory = await CutReview.findOne({
        where: { user: { id: verifiedUser.userId }, cutId },
      });
    }
    if (reviewHistory) {
      realTake = Math.min(take, 1);
    }
    const reviews = await CutReview.find({
      where: reviewHistory
        ? {
            cutId,
            id: Not(reviewHistory.id),
          }
        : { cutId },
      skip,
      take: realTake,
      order: { createdAt: 'DESC' },
    });

    if (reviewHistory) return [reviewHistory, ...reviews];
    return reviews;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuthenticated)
  async deleteReview(
    @Arg('id', () => Int) id: number,
    @Ctx() { verifiedUser }: MyContext,
  ): Promise<boolean> {
    const result = await CutReview.delete({
      id,
      user: { id: verifiedUser.userId },
    });
    if (result.affected && result.affected > 0) return true;
    return false;
  }
}
