import PropTypes from "prop-types";

import blank_profile from "./images/blank-profile-picture-female.png";
import Skill, { SkillPropType } from "./Skill";
import Button from "./atoms/Button";
import { useState } from "react";
import Modal from "./templates/Modal";
import Dialog from "./molecules/Dialog";
import axios from "axios";
import { toast } from "react-toastify";
import { GetWilders_wilders } from "../schemaTypes";
import { gql, useMutation } from "@apollo/client";

type WilderProps = Omit<GetWilders_wilders, "__typename"> & {
  onDelete: (name: string) => void;
};

const INCREMENT_MISSING_SIGNATURE_COUNT = gql`
  mutation IncrementMissingSignatureCount($id: String!) {
    incrementMissingSignatureCount(id: $id) {
      id
      missingSignatureCount
    }
  }
`;

const Wilder = ({
  id,
  name,
  city,
  skills,
  missingSignatureCount,
  onDelete,
}: WilderProps) => {
  const [askForConfirmationToDelete, setAskForConfirmationToDelete] =
    useState<boolean>(false);

  const [incrementMissingSignatureCount] = useMutation(
    INCREMENT_MISSING_SIGNATURE_COUNT,
    { variables: { id } }
  );

  const notifyWilderHasBeenDeleted = () =>
    toast.success(`${name} has been deleted`);

  const deleteWilder = async () => {
    await axios.delete(`/wilders/${name}`);
    notifyWilderHasBeenDeleted();
    onDelete(name);
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
      <hr />
      {missingSignatureCount} signatures manquées{" "}
      <Button onClick={incrementMissingSignatureCount}>+</Button>
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
  onDelete: PropTypes.func.isRequired,
};

export default Wilder;
