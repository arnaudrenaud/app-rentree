export type SkillType = {
  title: string;
  votes: number;
};

export type WilderType = {
  _id: string;
  name: string;
  city: string;
  skills: SkillType[];
};
