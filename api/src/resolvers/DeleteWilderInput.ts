import { ArgsType, Field } from "type-graphql";

@ArgsType()
class DeleteWilderInput {
  @Field()
  name!: string;
}

export default DeleteWilderInput;
