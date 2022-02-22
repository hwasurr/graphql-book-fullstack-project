import { execute, GraphQLSchema, subscribe } from 'graphql';
import http from 'http';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { JwtVerifiedUser, verifyAccessToken } from '../utils/jwt-auth';

export interface MySubscriptionContext {
  verifiedUser: JwtVerifiedUser | null;
}

export const createSubscriptionServer = async (
  schema: GraphQLSchema,
  server: http.Server,
): Promise<SubscriptionServer> => {
  return SubscriptionServer.create(
    {
      schema,
      execute,
      subscribe,
      onConnect: (connectionParams: any): MySubscriptionContext => {
        // WebSocketLink.connectionParams 반환값이 connectionParams로 전달되며
        // 이 함수의 반환값이 SubscriptionFilter의 context 로 전달됩니다.
        const accessToken = connectionParams.Authorization.split(' ')[1];
        return { verifiedUser: verifyAccessToken(accessToken) };
      },
      onDisconnect: () => {
        console.log('disconnected');
      },
    },
    { server, path: '/graphql' },
  );
};
