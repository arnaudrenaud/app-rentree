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

  async incrementMissingSignatureCount() {
    this.missingSignatureCount += 1;
    await this.save();
    return this;
  }

  async update({ name, city }: { name?: string; city?: string }) {
    if (name) {
      this.name = name;
    }
    if (city) {
      this.city = city;
    }
    await this.save();
    return this;
  }

  async getWilderWithSkills() {
    return Wilder.findOne({ id: this.id }, { relations: ["skills"] });
  }
}

export default Wilder;
