import { Args, Mutation, Query, Resolver } from "type-graphql";

import WilderModel, { Wilder } from "../models/Wilder";
import CreateWilderInput from "./CreateWilderInput";

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
}

export default WilderResolver;

// const deleteWilder = async (req: Request, res: Response) => {
//   const { name } = req.params;
//   const result = await WilderModel.deleteOne({ name });
//   if (result.deletedCount === 0) {
//     res.status(404).json({ success: false, result: "Wilder does not exist." });
//   }
//   res.json({ success: true, result });
// };

// const updateWilder = async (req: Request, res: Response) => {
//   const { name } = req.params;
//   const result = await WilderModel.updateOne({ name }, req.body);
//   res.json({ success: true, result });
// };

// export { createWilder, deleteWilder, getAllWilders, updateWilder };
