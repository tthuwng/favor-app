import 'reflect-metadata';
import fs from 'fs';
import path from 'path';

import dotenv from 'dotenv';
dotenv.config();

import { createConnection } from 'typeorm';
import { ApolloServer } from 'apollo-server';
import { buildSchema } from 'type-graphql';
// import NamedEntity from './models/NamedEntity';
// import Category from './models/Category';
// import Policy from './models/Policy';
// import Index from './models/Index';
import Favor from './models/Favor';
import User from './models/User';
// import CategoryResolver from './resolvers/CategoryResolver';
// import PolicyResolver from './resolvers/PolicyResolver';
import FavorResolver from './resolvers/FavorResolver';
// import IndexResolver from './resolvers/IndexResolver';
// import NamedEntityResolver from './resolvers/NamedEntityResolver';
import UserResolver from './resolvers/UserResolver';

const express = require('express');

const app = express();

async function main() {
  await createConnection({
    type: 'cockroachdb',
    synchronize: true,
    url: `postgres://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}.${process.env.DB_DB}`,
    host: `${process.env.DB_HOST}`,
    ssl: {
      rejectUnauthorized: false,
      ca: fs.readFileSync(path.resolve(__dirname, 'certs/root.crt')),
    },
    entities: [User, Favor],
  });

  console.log(
    `postgres://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}.${process.env.DB_DB}`
  );

  const schema = await buildSchema({
    resolvers: [
      //   CategoryResolver,
      //   PolicyResolver,
      //   EventResolver,
      //   IndexResolver,
      //   NamedEntityResolver,
      UserResolver,
    ], // TODO
    validate: false,
  });

  const server = new ApolloServer({
    schema,
    introspection: true,
    context: ({ req }) => {
      const context = req;
      return context;
    },
  });
  const port = 8001;
  const ip = '127.0.0.1';
  await server.listen(process.env.PORT || port);
  console.log(`FavorApp server has started at http://${ip}:${port}!`);
}

main();
