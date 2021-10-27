import { ApolloServer } from "apollo-server";
import dotenv from "dotenv";
import { createConnection } from "typeorm";
import "reflect-metadata";
import { buildSchema } from "type-graphql";

import Wilder from "./models/Wilder";
import Skill from "./models/Skill";
import WilderResolver from "./resolvers/WilderResolver";

dotenv.config();

const runServer = async () => {
  await createConnection({
    type: "sqlite",
    database: "./sqlite.db",
    entities: [Wilder, Skill],
    synchronize: true,
    logging: true,
  });
  // eslint-disable-next-line no-console
  console.log("Connected to database");

  const schema = await buildSchema({ resolvers: [WilderResolver] });
  const server = new ApolloServer({ schema });

  // The `listen` method launches a web server.
  server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
};

runServer();
