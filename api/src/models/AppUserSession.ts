import { BaseEntity, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import AppUser from "./AppUser";

@Entity()
class AppUserSession extends BaseEntity {
  @PrimaryColumn("varchar", {
    length: 32,
  })
  id!: string;

  @ManyToOne(() => AppUser)
  user!: AppUser;
}

export default AppUserSession;
