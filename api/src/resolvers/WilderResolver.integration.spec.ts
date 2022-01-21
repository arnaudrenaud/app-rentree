import { ApolloServer } from "apollo-server";
import { getConnection } from "typeorm";
import getApolloServer from "../apollo-server";
import getDatabaseConnection from "../database-connection";
import Wilder from "../models/Wilder";

describe("WilderResolver", () => {
  let server: ApolloServer;

  beforeAll(async () => {
    server = await getApolloServer();

    if (!process.env.TEST_DATABASE_URL) {
      throw Error("TEST_DATABASE_URL must be set in environment.");
    }

    return getDatabaseConnection(process.env.TEST_DATABASE_URL);
  });
  beforeEach(async () => {
    const entities = getConnection().entityMetadatas;
    // eslint-disable-next-line no-restricted-syntax
    for (const entity of entities) {
      const repository = getConnection().getRepository(entity.name);
      await repository.query(
        `TRUNCATE ${entity.tableName} RESTART IDENTITY CASCADE;`
      );
    }
  });
  afterAll(() => getConnection().close());

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

  describe("mutation createWilder", () => {
    const CREATE_WILDER = `
    mutation($name: String!, $city: String!) {
      createWilder(name: $name, city: $city) {
        id
        name
        city
        skills {
          title
        }
      }
    }
    `;

    it("creates and returns wilder", async () => {
      const result = await server.executeOperation({
        query: CREATE_WILDER,
        variables: {
          name: "Nouveau",
          city: "Bordeaux",
        },
      });

      expect(await Wilder.findOne({ name: "Nouveau" })).toHaveProperty(
        "city",
        "Bordeaux"
      );

      expect(result.errors).toBeUndefined();
      expect(result.data?.createWilder).toEqual({
        id: "1",
        name: "Nouveau",
        city: "Bordeaux",
        skills: [],
      });
    });
  });
});
