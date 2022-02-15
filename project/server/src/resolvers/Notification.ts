import {
  Arg,
  Ctx,
  Int,
  Mutation,
  Publisher,
  PubSub,
  Query,
  Resolver,
  ResolverFilterData,
  Root,
  Subscription,
  UseMiddleware,
} from 'type-graphql';
import { MyContext } from '../apollo/createApolloServer';
import Notification from '../entities/Notification';
import { isAuthenticated } from '../middlewares/isAuthenticated';

@Resolver(Notification)
export class NotificationResolver {
  @UseMiddleware(isAuthenticated)
  @Query(() => [Notification], {
    description: '세션에 해당되는 유저의 모든 알림을 가져옵니다.',
  })
  async notifications(
    @Ctx() { verifiedUser }: MyContext,
  ): Promise<Notification[]> {
    const notifications = await Notification.find({
      where: { userId: verifiedUser.userId },
      order: { createdAt: 'DESC' },
    });
    return notifications;
  }

  @UseMiddleware(isAuthenticated)
  @Mutation(() => Notification)
  async createNotification(
    @Arg('userId', () => Int) userId: number,
    @Arg('text') text: string,
    @PubSub('NOTIFICATION_CREATED') publish: Publisher<Notification>,
  ): Promise<Notification> {
    const newNoti = await Notification.create({
      text,
      userId,
    }).save();
    await publish(newNoti);
    return newNoti;
  }

  @Subscription({
    topics: 'NOTIFICATION_CREATED',
    // 자기 자신에게 온 알림이 생성되었을 때만 실행되어야 함.
    filter: ({
      payload,
      context,
    }: ResolverFilterData<Notification, null, MyContext>) => {
      console.log('newNotification context: ', context);
      return true;
      // if (payload && payload.userId === auth.userId) return true;
      // return false;
    },
  })
  newNotification(@Root() notificationPayload: Notification): Notification {
    // console.log('newNotification - ctx: ', ctx);
    return notificationPayload;
  }
}
