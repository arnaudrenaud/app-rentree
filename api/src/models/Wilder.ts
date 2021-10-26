import { Schema, model } from "mongoose";
import { Field, ID, ObjectType } from "type-graphql";

import Skill from "./Skill";

@ObjectType()
class Wilder {
  @Field(() => ID)
  name!: string;

  @Field()
  city!: string;

  @Field(() => [Skill])
  skills!: Skill[];
}

const WilderSchema = new Schema({
  name: { type: String, unique: true },
  city: String,
  skills: [{ title: String, votes: Number }],
});
const WilderModel = model("wilder", WilderSchema);

export default WilderModel;
export { Wilder };
