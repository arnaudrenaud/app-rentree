import { ApolloServer } from "apollo-server";
import dotenv from "dotenv";
import mongoose from "mongoose";
import "reflect-metadata";
import { buildSchema } from "type-graphql";

import WilderModel from "./models/Wilder";
import WilderResolver from "./resolvers/WilderResolver";

dotenv.config();

const runServer = async () => {
  const { MONGO_URL } = process.env;
  if (!MONGO_URL) {
    throw Error("A MONGO_URL must be provided in environment.");
  }
  await mongoose.connect(MONGO_URL, { autoIndex: true });

  // eslint-disable-next-line no-console
  console.log("Connected to database");

  await WilderModel.init();

  const schema = await buildSchema({ resolvers: [WilderResolver] });
  const server = new ApolloServer({ schema });

  // The `listen` method launches a web server.
  server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
};

runServer();
