import {
  Arg,
  Args,
  Mutation,
  Publisher,
  PubSub,
  Query,
  Resolver,
  Root,
  Subscription,
} from "type-graphql";

import Wilder from "../models/Wilder";
import CreateWilderInput from "./CreateWilderInput";
import DeleteWilderInput from "./DeleteWilderInput";
import UpdateWilderInput from "./UpdateWilderInput";

const WILDERS_UPDATE_SUBSCRIPTION_TOPIC = "WILDERS_UPDATE";

@Resolver(Wilder)
class WilderResolver {
  @Query(() => [Wilder])
  async wilders() {
    const wilders = await Wilder.find({ relations: ["skills"] });
    return wilders;
  }

  @Mutation(() => Wilder)
  async createWilder(@Args() { name, city }: CreateWilderInput) {
    const wilderToBeCreated = new Wilder();
    wilderToBeCreated.name = name;
    wilderToBeCreated.city = city;
    const newWilder = await wilderToBeCreated.save();
    return Wilder.findOne({ id: newWilder.id }, { relations: ["skills"] });
  }

  @Mutation(() => Wilder)
  async deleteWilder(@Args() { id }: DeleteWilderInput) {
    const wilder = await Wilder.findOneOrFail({ id });
    await Wilder.remove(wilder);
    return wilder;
  }

  @Mutation(() => Wilder)
  async updateWilder(@Args() { id, name, city }: UpdateWilderInput) {
    const wilder = await Wilder.findOneOrFail({ id });
    await Wilder.update(wilder, { name, city });
    const updatedWilder = await Wilder.findOne({ id });
    return updatedWilder;
  }

  @Mutation(() => Wilder)
  async incrementMissingSignatureCount(
    @Arg("id", () => String) _id: string,
    @PubSub(WILDERS_UPDATE_SUBSCRIPTION_TOPIC) publish: Publisher<Wilder>
  ) {
    const id = parseInt(_id, 10);
    const wilder = await Wilder.findOneOrFail({ id });
    await Wilder.update(wilder, {
      missingSignatureCount: wilder.missingSignatureCount + 1,
    });
    const updatedWilder = (await Wilder.findOne({ id })) as Wilder;
    await publish(updatedWilder);
    return updatedWilder;
  }

  @Subscription(() => Wilder, { topics: WILDERS_UPDATE_SUBSCRIPTION_TOPIC })
  async onWilderUpdate(@Root() wilder: Wilder) {
    return wilder;
  }
}

export default WilderResolver;
