import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import WilderResolver from "./resolvers/WilderResolver";

export default async () => {
  const schema = await buildSchema({ resolvers: [WilderResolver] });
  const server = new ApolloServer({ schema });
  return { server, schema };
};
