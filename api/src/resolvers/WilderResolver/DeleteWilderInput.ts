import { ArgsType, Field, Int } from "type-graphql";

@ArgsType()
class DeleteWilderInput {
  @Field(() => Int)
  id!: number;
}

export default DeleteWilderInput;
