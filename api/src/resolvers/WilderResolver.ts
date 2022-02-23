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
import WilderRepository from "../models/WilderRepository";
import CreateWilderInput from "./CreateWilderInput";
import DeleteWilderInput from "./DeleteWilderInput";
import UpdateWilderInput from "./UpdateWilderInput";

const WILDERS_UPDATE_SUBSCRIPTION_TOPIC = "WILDERS_UPDATE";

@Resolver(Wilder)
class WilderResolver {
  @Query(() => [Wilder])
  async wilders() {
    return WilderRepository.getWildersWithSkills();
  }

  @Mutation(() => Wilder)
  async createWilder(@Args() { name, city }: CreateWilderInput) {
    return WilderRepository.createWilder(name, city);
  }

  @Mutation(() => Wilder)
  async deleteWilder(@Args() { id }: DeleteWilderInput) {
    return WilderRepository.deleteWilder(id);
  }

  @Mutation(() => Wilder)
  async updateWilder(@Args() { id, name, city }: UpdateWilderInput) {
    return WilderRepository.updateWilder(id, { name, city });
  }

  @Mutation(() => Wilder)
  async incrementMissingSignatureCount(
    @Arg("id", () => String) _id: string,
    @PubSub(WILDERS_UPDATE_SUBSCRIPTION_TOPIC) publish: Publisher<Wilder>
  ) {
    const id = parseInt(_id, 10);
    const wilder =
      await WilderRepository.incrementMissingSignatureCountForWilder(id);
    await publish(wilder);
    return wilder;
  }

  @Subscription(() => Wilder, { topics: WILDERS_UPDATE_SUBSCRIPTION_TOPIC })
  async onWilderUpdate(@Root() wilder: Wilder) {
    return wilder;
  }
}

export default WilderResolver;
