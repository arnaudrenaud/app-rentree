import { ApolloServer } from "apollo-server-express";
import { getConnection } from "typeorm";
import getApolloServer from "../../apollo-server";
import getDatabaseConnection from "../../database-connection";
import AppUser from "../../models/AppUser";
import AppUserRepository from "../../models/AppUserRepository";

describe("AppUserResolver", () => {
  let server: ApolloServer;
  beforeAll(async () => {
    server = (await getApolloServer()).server;

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

  describe("mutation signUp", () => {
    const SIGN_UP = `
    mutation($emailAddress: String!, $password: String!) {
      signUp(emailAddress: $emailAddress, password: $password) {
        emailAddress
      }
    }
    `;

    const emailAddress = "me@server.com";
    const password = "my password";

    describe("when no user with the same email address exists", () => {
      it("creates and returns new user", async () => {
        const result = await server.executeOperation({
          query: SIGN_UP,
          variables: {
            emailAddress,
            password,
          },
        });

        expect(result.data).toMatchInlineSnapshot(`
          Object {
            "signUp": Object {
              "emailAddress": "me@server.com",
            },
          }
        `);
        expect(
          await AppUserRepository.findByEmailAddress(emailAddress)
        ).toHaveProperty("emailAddress", emailAddress);
      });
    });

    describe("when user with the same email address exists already", () => {
      it("returns error", async () => {
        const existingAppUser = new AppUser();
        existingAppUser.emailAddress = emailAddress;
        existingAppUser.password = "does not matter";
        await existingAppUser.save();

        const result = await server.executeOperation({
          query: SIGN_UP,
          variables: {
            emailAddress,
            password,
          },
        });

        expect(result.data).toBeNull();
        expect(result.errors).toMatchInlineSnapshot(`
            Array [
              [GraphQLError: Could not sign up with provided email address.],
            ]
          `);
      });
    });
  });

  describe("mutation signIn", () => {
    describe("when no user with the same email address exists", () => {
      it("returns error", () => {});
    });

    describe("when user with the same email address exists already", () => {
      describe("when password is correct", () => {
        it("returns user", () => {});

        it("returns cookie with session ID", () => {});
      });

      describe("when password is not correct", () => {
        it("returns error", () => {});
      });
    });
  });

  describe("query myProfile", () => {
    describe("when passed cookie with valid session ID", () => {
      it("returns user", () => {});
    });

    describe("otherwise", () => {
      it("returns null", () => {});
    });
  });
});
