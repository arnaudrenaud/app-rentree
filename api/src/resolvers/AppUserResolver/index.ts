import { Args, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { CustomContext } from "../../CustomContext";
import AppUser from "../../models/AppUser";
import AppUserRepository from "../../models/AppUserRepository";
import SignInInput from "./SignInInput";
import SignUpInput from "./SignUpInput";

@Resolver(AppUserRepository)
class AppUserResolver {
  @Mutation(() => AppUser)
  async signUp(
    @Args() { emailAddress, password }: SignUpInput
  ): Promise<AppUser | undefined> {
    return AppUserRepository.signUp(emailAddress, password);
  }

  @Mutation(() => AppUser)
  async signIn(
    @Args() { emailAddress, password }: SignInInput,
    @Ctx() { onSessionCreated }: CustomContext
  ): Promise<AppUser | undefined> {
    return AppUserRepository.signIn(emailAddress, password, onSessionCreated);
  }

  @Query(() => AppUser)
  async myProfile(@Ctx() { appUser }: CustomContext): Promise<AppUser | null> {
    return appUser;
  }
}

export default AppUserResolver;
