import styled from "styled-components";
import Button from "../atoms/Button";
import { BASE_SPACING } from "../constants.styles";

const Buttons = styled.div`
  display: grid;
  grid-template-columns: 72px 72px;
  gap: ${BASE_SPACING};
  justify-content: end;
`;

const Dialog = ({
  text,
  onCancel,
  onConfirmation,
}: {
  text: string;
  onCancel: () => void;
  onConfirmation: () => void;
}) => {
  return (
    <div role="dialog">
      {text}
      <Buttons>
        <Button onClick={onCancel}>Annuler</Button>
        <Button onClick={onConfirmation}>OK</Button>
      </Buttons>
    </div>
  );
};

export default Dialog;
