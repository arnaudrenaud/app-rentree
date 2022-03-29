import { IsEmail, MinLength } from "class-validator";
import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
class AppUser extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: number;

  @Column({ unique: true })
  @IsEmail()
  @Field(() => String)
  emailAddress!: string;

  @Column()
  @MinLength(8)
  password!: string;
}

export default AppUser;
