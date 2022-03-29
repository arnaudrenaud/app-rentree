// import { getConnection } from "typeorm";
// import getDatabaseConnection from "../database-connection";
// import AppUser from "./AppUser";
// import AppUserSessionRepository from "./AppUserSessionRepository";
// import * as utils from "../utils";

// jest.mock("../utils");

// describe("AppUserSessionRepository", () => {
//   beforeAll(async () => {
//     if (!process.env.TEST_DATABASE_URL) {
//       throw Error("TEST_DATABASE_URL must be set in environment.");
//     }

//     return getDatabaseConnection(process.env.TEST_DATABASE_URL);
//   });
//   beforeEach(async () => {
//     const entities = getConnection().entityMetadatas;
//     // eslint-disable-next-line no-restricted-syntax
//     for (const entity of entities) {
//       const repository = getConnection().getRepository(entity.name);
//       await repository.query(
//         `TRUNCATE ${entity.tableName} RESTART IDENTITY CASCADE;`
//       );
//     }
//   });
//   afterAll(() => getConnection().close());

//   describe("static createNew", () => {
//     const mockGetRandomHexID = utils.getRandomHexID as jest.Mock;

//     beforeEach(() => {
//       mockGetRandomHexID.mockReturnValue(() => "a".repeat(32));
//     });

//     describe("when passed user", () => {
//       describe("normally", () => {
//         it("creates and returns session", async () => {
//           const user = new AppUser();
//           user.emailAddress = "me@test.com";
//           user.password = "password";
//           user.save();

//           const newSession = await AppUserSessionRepository.createNew(user);
//           expect(newSession).toMatchInlineSnapshot(`
//             AppUserSession {
//               "id": "f2fb4af2641eaa9bbaaf2ec57a1616fc",
//               "user": AppUser {
//                 "emailAddress": "me@test.com",
//                 "id": undefined,
//                 "password": "password",
//               },
//             }
//           `);
//         });
//       });

//       describe("when session already exists with same ID as new session", () => {
//         it("creates and returns session with other session ID", () => {});
//       });
//     });
//   });
// });
