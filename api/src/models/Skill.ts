import { Field, ID, Int, ObjectType } from "type-graphql";

@ObjectType()
class Skill {
  @Field(() => ID)
  title!: string;

  @Field(() => Int)
  votes!: number;
}

export default Skill;
