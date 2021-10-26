import { ArgsType, Field } from "type-graphql";

@ArgsType()
class CreateWilderInput {
  @Field()
  name!: string;

  @Field()
  city!: string;
}

export default CreateWilderInput;
