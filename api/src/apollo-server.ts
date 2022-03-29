import { ApolloServer, ExpressContext } from "apollo-server-express";
import { Response } from "express";
import { buildSchema } from "type-graphql";
import { parse } from "cookie";

import AppUserResolver from "./resolvers/AppUserResolver";
import WilderResolver from "./resolvers/WilderResolver";
import { CustomContext } from "./CustomContext";
import AppUserSessionRepository from "./models/AppUserSessionRepository";

const setSessionIdInCookies = (res: Response) => (sessionId: string) => {
  res.cookie("sessionId", sessionId, {
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });
};

const setUpContext = async (
  context: ExpressContext
): Promise<CustomContext> => {
  const { sessionId } = parse(context.req.headers.cookie || "");

  return {
    onSessionCreated: setSessionIdInCookies(context.res),
    appUser: sessionId
      ? await AppUserSessionRepository.getUser(sessionId)
      : null,
  };
};

export default async () => {
  const schema = await buildSchema({
    resolvers: [WilderResolver, AppUserResolver],
  });
  const server = new ApolloServer({ schema, context: setUpContext });
  return { server, schema };
};
