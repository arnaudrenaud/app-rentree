import PropTypes from "prop-types";
import * as styled from "./Skill.styled";

const Skill = ({ title, votes }) => {
  return (
    <li>
      {title}
      <styled.Votes>{votes}</styled.Votes>
    </li>
  );
};

Skill.propTypes = {
  title: PropTypes.string.isRequired,
  votes: PropTypes.number.isRequired,
};

export default Skill;
