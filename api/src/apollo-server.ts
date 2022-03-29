import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import AppUserResolver from "./resolvers/AppUserResolver";
import WilderResolver from "./resolvers/WilderResolver";

export default async () => {
  const schema = await buildSchema({
    resolvers: [WilderResolver, AppUserResolver],
  });
  const server = new ApolloServer({ schema });
  return { server, schema };
};
