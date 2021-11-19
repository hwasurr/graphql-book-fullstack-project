import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { ApolloServer } from 'apollo-server-express';
import { Request, Response } from 'express';
import { buildSchema } from 'type-graphql';
import { CutResolver } from '../resolvers/Cut';
import { FilmResolver } from '../resolvers/Film';
import { UserResolver } from '../resolvers/User';
import {
  JwtVerifiedUser,
  verifyAccessTokenFromReqHeaders,
} from '../utils/jwt-auth';

export interface MyContext {
  req: Request;
  res: Response;
  verifiedUser: JwtVerifiedUser;
}

const createApolloServer = async (): Promise<ApolloServer> => {
  return new ApolloServer<MyContext>({
    schema: await buildSchema({
      resolvers: [FilmResolver, CutResolver, UserResolver],
    }),
    plugins: [ApolloServerPluginLandingPageLocalDefault()],
    context: ({ req, res }) => {
      // 액세스 토큰 검증
      const verifed = verifyAccessTokenFromReqHeaders(req.headers);
      return { req, res, verifiedUser: verifed };
    },
  });
};

export default createApolloServer;

// context: ({ req, res }) => {
//   let user: User | null = null;
//   const { authorization } = req.headers;
//   if (!authorization) user = null;
//   const accessToken = authorization?.split(' ')[1];
//   if (!accessToken) user = null;
//   if (accessToken) {
//     try {
//       user = jwt.verify(
//         accessToken,
//         process.env.JWT_SECRET_KEY || 'secret-key',
//       ) as User;
//     } catch (err) {
//       console.error('access_token expired: ', err.expiredAt);
//       user = null;
//     }
//   }
//   return {
//     req,
//     res,
//     user,
//   };
// },
