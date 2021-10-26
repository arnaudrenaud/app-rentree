import { Args, Mutation, Query, Resolver } from "type-graphql";

import WilderModel, { Wilder } from "../models/Wilder";
import CreateWilderInput from "./CreateWilderInput";
import DeleteWilderInput from "./DeleteWilderInput";
import UpdateWilderInput from "./UpdateWilderInput";

@Resolver(Wilder)
class WilderResolver {
  @Query(() => [Wilder])
  async wilders() {
    const wilders = await WilderModel.find();
    return wilders;
  }

  @Mutation(() => Wilder)
  async createWilder(@Args() { name, city }: CreateWilderInput) {
    const wilder = new WilderModel({ name, city });
    const result = await wilder.save();
    return result;
  }

  @Mutation(() => Wilder)
  async deleteWilder(@Args() { name }: DeleteWilderInput) {
    const wilder = await WilderModel.findOne({ name });
    if (!wilder) {
      throw Error("Wilder does not exist.");
    }
    await WilderModel.deleteOne({ name });
    return wilder;
  }

  @Mutation(() => Wilder)
  async updateWilder(
    @Args() { initialName, newName, city }: UpdateWilderInput
  ) {
    const wilder = await WilderModel.findOne({ name: initialName });
    if (!wilder) {
      throw Error("Wilder does not exist.");
    }
    const result = await WilderModel.findOneAndUpdate(
      { name: initialName },
      { name: newName, city },
      { returnOriginal: false }
    );
    return result;
  }
}

export default WilderResolver;
