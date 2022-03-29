import { compare, hash } from "bcrypt";
import AppUser from "./AppUser";
import AppUserSessionRepository from "./AppUserSessionRepository";

class AppUserRepository extends AppUser {
  static findByEmailAddress = (
    emailAddress: string
  ): Promise<AppUser | undefined> =>
    AppUser.findOne({ where: { emailAddress } });

  static async signUp(
    emailAddress: string,
    password: string
  ): Promise<AppUser | undefined> {
    const existingUser = await AppUserRepository.findByEmailAddress(
      emailAddress
    );
    if (existingUser) {
      throw Error("Could not sign up with provided email address.");
    }
    await AppUser.insert({
      emailAddress,
      password: await hash(password, 10),
    });
    return AppUserRepository.findByEmailAddress(emailAddress);
  }

  static async signIn(
    emailAddress: string,
    password: string,
    onSessionCreated: (sessionId: string) => void
  ): Promise<AppUser> {
    const COULD_NOT_SIGN_IN =
      "Could not sign in with provided email address and password.";

    const existingUser = await AppUserRepository.findByEmailAddress(
      emailAddress
    );
    if (!existingUser) {
      throw Error(COULD_NOT_SIGN_IN);
    }
    const isPasswordCorrect = await compare(password, existingUser.password);
    if (isPasswordCorrect) {
      const session = await AppUserSessionRepository.createNew(existingUser);
      onSessionCreated(session.id);
      return existingUser;
    }
    throw Error(COULD_NOT_SIGN_IN);
  }
}

export default AppUserRepository;
