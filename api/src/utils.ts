import { randomBytes } from "crypto";

export const getRandomHexID = (): string => randomBytes(16).toString("hex");
