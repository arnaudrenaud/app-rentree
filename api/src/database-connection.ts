import { createConnection } from "typeorm";
import Wilder from "./models/Wilder";
import Skill from "./models/Skill";

export default async (database: string, logging = false) => {
  await createConnection({
    type: "sqlite",
    database,
    entities: [Wilder, Skill],
    synchronize: true,
    logging,
  });
};
