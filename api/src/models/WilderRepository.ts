import Wilder from "./Wilder";

class WilderRepository extends Wilder {
  static async getWildersWithSkills() {
    const wilders = await Wilder.find({ relations: ["skills"] });
    return wilders;
  }

  static async createWilder(name: string, city: string) {
    const wilderToBeCreated = new Wilder();
    wilderToBeCreated.name = name;
    wilderToBeCreated.city = city;
    const newWilder = await wilderToBeCreated.save();
    return newWilder.getWilderWithSkills();
  }

  static async deleteWilder(id: number) {
    const wilder = await Wilder.findOneOrFail({ id });
    await Wilder.remove(wilder);
    return wilder;
  }

  static async updateWilder(
    id: number,
    { name, city }: { name?: string; city?: string }
  ) {
    const wilder = await Wilder.findOneOrFail({ id });
    return wilder.update({ name, city });
  }

  static async incrementMissingSignatureCountForWilder(id: number) {
    const wilder = await Wilder.findOneOrFail({ id });
    return wilder.incrementMissingSignatureCount();
  }
}

export default WilderRepository;
