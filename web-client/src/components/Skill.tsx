import PropTypes from "prop-types";
import { GetWilders_wilders_skills } from "../schemaTypes";
import * as styled from "./Skill.styled";

type SkillProps = Omit<GetWilders_wilders_skills, "__typename">;

const Skill = ({ title, votes }: SkillProps) => {
  return (
    <li>
      {title}
      <styled.Votes>{votes}</styled.Votes>
    </li>
  );
};

export const SkillPropType = {
  title: PropTypes.string.isRequired,
  votes: PropTypes.number.isRequired,
};

Skill.propTypes = SkillPropType;

export default Skill;
