import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

import Skill from "./Skill";

@Entity()
@ObjectType()
class Wilder extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: number;

  @Column()
  @Field()
  name!: string;

  @Column()
  @Field()
  city!: string;

  @ManyToMany(() => Skill)
  @JoinTable()
  @Field(() => [Skill])
  skills!: Skill[];
}

export default Wilder;
