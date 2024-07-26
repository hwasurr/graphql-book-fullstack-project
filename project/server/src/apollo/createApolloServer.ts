import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core'; 
import { buildSchema } from 'type-graphql';
import { FilmResolver } from '../resolvers/Film';
import { CutResolver } from '../resolvers/Cut'; 
import { UserResolver } from '../resolvers/User';
import { Request, Response } from 'express'; 
import { JwtVerifiedUser, verifyAccessTokenFromReqHeaders } from '../utils/jwt-auth';
import redis from '../redis/redis-client';


export interface MyContext {
  req: Request;
  res: Response;
  verifiedUser: JwtVerifiedUser;
  redis: typeof redis;
}

const createApolloServer = async (): Promise<ApolloServer> => {
  return new ApolloServer<MyContext>({
    schema: await buildSchema({
      resolvers: [FilmResolver, CutResolver, UserResolver],
    }),
    plugins: [ApolloServerPluginLandingPageLocalDefault()],
    context: ({ req, res }) => {
      const verified = verifyAccessTokenFromReqHeaders(req.headers);
      return { req, res, verifiedUser: verified, redis };
    },
  });
};





export default createApolloServer;