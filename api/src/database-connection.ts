import { createConnection } from "typeorm";
import Wilder from "./models/Wilder";
import Skill from "./models/Skill";

export default async (url: string, logging = false) => {
  await createConnection({
    type: "postgres",
    url,
    entities: [Wilder, Skill],
    synchronize: true,
    logging,
  });
};
