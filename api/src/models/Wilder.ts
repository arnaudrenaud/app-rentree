import { Field, ID, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

import Skill from "./Skill";

@Entity({ orderBy: { id: "ASC" } })
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

  @Column({ type: "integer", unsigned: true, default: 0 })
  @Field(() => Int)
  missingSignatureCount!: number;
}

export default Wilder;
