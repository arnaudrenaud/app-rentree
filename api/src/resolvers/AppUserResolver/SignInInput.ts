import { IsEmail, MinLength } from "class-validator";
import { ArgsType, Field } from "type-graphql";

@ArgsType()
class SignInInput {
  @Field()
  @IsEmail()
  emailAddress!: string;

  @Field()
  @MinLength(8)
  password!: string;
}

export default SignInInput;
