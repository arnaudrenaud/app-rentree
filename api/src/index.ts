import "reflect-metadata";
import { createServer } from "http";
import { execute, subscribe } from "graphql";
import { SubscriptionServer } from "subscriptions-transport-ws";

import getDatabaseConnection from "./database-connection";
import getExpressServer from "./express-server";

const main = async () => {
  if (!process.env.DATABASE_URL) {
    throw Error("DATABASE_URL must be set in environment.");
  }

  getDatabaseConnection(process.env.DATABASE_URL);
  // eslint-disable-next-line no-console
  console.log("Connected to database");

  const { expressServer, apolloServer, graphQLSchema } =
    await getExpressServer();

  const server = createServer(expressServer);
  server.listen(3004, () => {
    console.log(
      `🚀 Server ready at http://localhost:3004${apolloServer.graphqlPath}`
    );
    // Set up the WebSocket for handling GraphQL subscriptions
    // eslint-disable-next-line no-new
    new SubscriptionServer(
      {
        execute,
        subscribe,
        schema: graphQLSchema,
      },
      {
        server,
        path: apolloServer.graphqlPath,
      }
    );
  });
};

main();
