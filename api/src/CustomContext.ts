import AppUser from "./models/AppUser";

export type CustomContext = {
  onSessionCreated: (sessionId: string) => void;
  appUser: AppUser | null;
};
