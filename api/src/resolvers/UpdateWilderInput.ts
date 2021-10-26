import { ArgsType, Field } from "type-graphql";

@ArgsType()
class UpdateWilderInput {
  @Field()
  initialName!: string;

  @Field({ nullable: true })
  newName?: string;

  @Field({ nullable: true })
  city?: string;
}

export default UpdateWilderInput;
