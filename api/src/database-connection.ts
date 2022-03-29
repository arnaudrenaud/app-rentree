import { createConnection } from "typeorm";
import Skill from "./models/Skill";
import Wilder from "./models/Wilder";
import AppUser from "./models/AppUser";
import AppUserSession from "./models/AppUserSession";

export default async (url: string, logging = false) => {
  await createConnection({
    type: "postgres",
    url,
    entities: [Wilder, Skill, AppUser, AppUserSession],
    synchronize: true,
    logging,
  });
};
