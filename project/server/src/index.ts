import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import express from 'express';
import { graphqlUploadExpress } from 'graphql-upload';
import http from 'http';
import 'reflect-metadata';
import createApolloServer from './apollo/createApolloServer';
import { createSchema } from './apollo/createSchema';
import { createSubscriptionServer } from './apollo/createSubscriptionServer';
import { createDB } from './db/db-client';

dotenv.config();

async function main() {
  await createDB();
  const app = express();
  app.use(express.static('public'));
  app.use(cookieParser());
  app.use(graphqlUploadExpress({ maxFileSize: 1024 * 1000 * 5, maxFiles: 1 }));
  app.get('/', (req, res) => {
    res.status(200).send(); // for healthcheck
  });
  const httpServer = http.createServer(app);

  const schema = await createSchema();
  await createSubscriptionServer(schema, httpServer);
  const apolloServer = await createApolloServer(schema);
  await apolloServer.start();
  apolloServer.applyMiddleware({
    app,
    cors: {
      origin: [
        'http://localhost:3000',
        'https://studio.apollographql.com',
        process.env.FRONT_ORIGIN || '',
      ],
      credentials: true,
    },
  });

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
