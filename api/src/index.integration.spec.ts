import { ApolloServer } from "apollo-server";
import { getConnection } from "typeorm";
import getApolloServer from "./apollo-server";
import getDatabaseConnection from "./database-connection";
import Wilder from "./models/Wilder";

describe("Server", () => {
  let server: ApolloServer;

  beforeAll(async () => {
    server = await getApolloServer();
  });
  beforeEach(() => getDatabaseConnection(":memory:"));
  afterEach(() => getConnection().close());

  describe("query wilders", () => {
    const GET_WILDERS = `
    query {
      wilders {
        id
        name
        city
        skills {
          id
          title
          votes
        }
      }
    }`;

    describe("when there are no wilders in database", () => {
      it("returns empty array", async () => {
        const result = await server.executeOperation({
          query: GET_WILDERS,
        });
        expect(result.errors).toBeUndefined();
        expect(result.data?.wilders).toEqual([]);
      });
    });

    describe("when there are wilders in database", () => {
      it("returns all wilders in database", async () => {
        const wilder1 = new Wilder();
        wilder1.name = "Nouveau";
        wilder1.city = "Paris";
        await wilder1.save();

        const wilder2 = new Wilder();
        wilder2.name = "Nouvelle";
        wilder2.city = "Toulouse";
        await wilder2.save();

        const result = await server.executeOperation({
          query: GET_WILDERS,
        });
        expect(result.errors).toBeUndefined();
        expect(result.data?.wilders).toMatchInlineSnapshot(`
          Array [
            Object {
              "city": "Paris",
              "id": "1",
              "name": "Nouveau",
              "skills": Array [],
            },
            Object {
              "city": "Toulouse",
              "id": "2",
              "name": "Nouvelle",
              "skills": Array [],
            },
          ]
        `);
      });
    });
  });
});
