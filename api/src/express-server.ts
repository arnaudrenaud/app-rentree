import express, { Application } from "express";
import { ApolloServer } from "apollo-server-express";
import { GraphQLSchema } from "graphql";
import getApolloServer from "./apollo-server";

export default async (): Promise<{
  expressServer: Application;
  apolloServer: ApolloServer;
  graphQLSchema: GraphQLSchema;
}> => {
  const { server: apolloServer, schema: graphQLSchema } =
    await getApolloServer();
  await apolloServer.start();

  const expressServer = express();

  apolloServer.applyMiddleware({ app: expressServer });

  return { expressServer, apolloServer, graphQLSchema };
};
