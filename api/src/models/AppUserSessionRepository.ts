import { getRandomHexID } from "../utils";
import AppUser from "./AppUser";
import AppUserSession from "./AppUserSession";

class AppUserSessionRepository extends AppUserSession {
  static async createNew(user: AppUser): Promise<AppUserSession> {
    try {
      const id = getRandomHexID();
      const session = new AppUserSession();
      session.id = id;
      session.user = user;
      await session.save();
      return session;
    } catch (error) {
      return AppUserSessionRepository.createNew(user);
    }
  }

  static async getUser(sessionId: string): Promise<AppUser | null> {
    const session = await AppUserSession.findOne({
      where: { id: sessionId },
      relations: ["user"],
    });

    return session?.user || null;
  }
}

export default AppUserSessionRepository;
