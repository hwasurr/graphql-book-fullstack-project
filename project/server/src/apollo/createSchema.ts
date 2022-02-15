import { GraphQLSchema } from 'graphql';
import { PubSub } from 'graphql-subscriptions';
import { buildSchema } from 'type-graphql';
import { CutResolver } from '../resolvers/Cut';
import { CutReviewResolver } from '../resolvers/CutReview';
import { FilmResolver } from '../resolvers/Film';
import { NotificationResolver } from '../resolvers/Notification';
import { UserResolver } from '../resolvers/User';

export const createSchema = async (): Promise<GraphQLSchema> => {
  return buildSchema({
    resolvers: [
      FilmResolver,
      CutResolver,
      UserResolver,
      CutReviewResolver,
      NotificationResolver,
    ],
    pubSub: new PubSub(),
  });
};
