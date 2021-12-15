import { IsInt, IsString } from 'class-validator';
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  Resolver,
  UseMiddleware,
} from 'type-graphql';
import { MyContext } from '../apollo/createApolloServer';
import { CutReview } from '../entities/CutReview';
import { isAuthenticated } from '../middlewares/isAuthenticated';

@InputType()
class CreateOrUpdateCutReviewInput {
  @Field({ description: '명장면 번호' }) @IsInt() cutId: number;

  @Field({ description: '감상평 내용' })
  @IsString()
  contents: string;
}

@Resolver(CutReview)
export class CutReviewResolver {
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

  // @Mutation()
  // deleteCutReview() {}
}
