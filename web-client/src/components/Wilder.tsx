import PropTypes from "prop-types";

import blank_profile from "./images/blank-profile-picture-female.png";
import Skill, { SkillPropType } from "./Skill";
import { WilderType } from "../types";

type WilderProps = Omit<WilderType, "_id">;

const Wilder = ({ name, city, skills }: WilderProps) => {
  return (
    <article className="card">
      <img src={blank_profile} alt="Jane Doe Profile" />
      <h3>{name}</h3>
      <p>{city}</p>
      <h4>Wild Skills</h4>
      <ul className="skills">
        {skills.map((skill) => {
          return (
            <Skill key={skill.title} title={skill.title} votes={skill.votes} />
          );
        })}
      </ul>
    </article>
  );
};

Wilder.propTypes = {
  name: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  skills: PropTypes.arrayOf(PropTypes.shape(SkillPropType)),
};

export default Wilder;
