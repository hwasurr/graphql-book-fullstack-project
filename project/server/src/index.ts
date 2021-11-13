import 'reflect-metadata';
import express from 'express';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { ApolloServer } from 'apollo-server-express';
import http from 'http';
import { buildSchema } from 'type-graphql';
import { CutResolver } from './resolvers/Cut';
import { FilmResolver } from './resolvers/Film';
import { createDB } from './db/db-client';
import { UserResolver } from './resolvers/User';

async function main() {
  await createDB();
  const app = express();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [FilmResolver, CutResolver, UserResolver],
    }),
    plugins: [ApolloServerPluginLandingPageLocalDefault()],
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  const httpServer = http.createServer(app);

  httpServer.listen(process.env.PORT || 4000, () => {
    if (process.env.NODE_ENV !== 'production') {
      console.log(`
      server started on => http://localhost:4000
      apollo studio => http://localhost:4000/graphql
      `);
    } else {
      console.log(`
      Production server Started...
      `);
    }
  });
}

main().catch((err) => console.error(err));
