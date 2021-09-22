import PropTypes from "prop-types";
import { SkillType } from "../types";
import * as styled from "./Skill.styled";

const Skill = ({ title, votes }: SkillType) => {
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
