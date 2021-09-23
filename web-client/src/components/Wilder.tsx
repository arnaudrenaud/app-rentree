import PropTypes from "prop-types";

import blank_profile from "./images/blank-profile-picture-female.png";
import Skill, { SkillPropType } from "./Skill";
import { WilderType } from "../types";
import Button from "./atoms/Button";
import { useState } from "react";
import Modal from "./templates/Modal";
import Dialog from "./molecules/Dialog";

type WilderProps = Omit<WilderType, "_id">;

const Wilder = ({ name, city, skills }: WilderProps) => {
  const [askForConfirmationToDelete, setAskForConfirmationToDelete] =
    useState<boolean>(false);

  const deleteWilder = () => {
    console.log("deleted");
  };

  const showConfirmationToDelete = () => {
    setAskForConfirmationToDelete(true);
  };

  const hideConfirmationToDelete = () => {
    setAskForConfirmationToDelete(false);
  };

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
      <Button onClick={showConfirmationToDelete}>Supprimer</Button>
      {askForConfirmationToDelete && (
        <Modal onClose={hideConfirmationToDelete}>
          <Dialog
            text={`${name} sera supprimé.`}
            onCancel={hideConfirmationToDelete}
            onConfirmation={deleteWilder}
          />
        </Modal>
      )}
    </article>
  );
};

Wilder.propTypes = {
  name: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  skills: PropTypes.arrayOf(PropTypes.shape(SkillPropType)),
};

export default Wilder;
