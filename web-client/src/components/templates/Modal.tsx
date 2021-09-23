import { useEffect } from "react";
import styled from "styled-components";
import FocusTrap from "focus-trap-react";

import { BASE_SPACING } from "../constants.styles";

const StyledOverlay = styled.div`
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
`;

const StyledModalContent = styled.div`
  background-color: #fefefe;
  margin: 15% auto;
  padding: ${BASE_SPACING};
  width: 80%;
  border-radius: 6px;
`;

const Modal = ({
  children,
  onClose,
}: {
  children: JSX.Element;
  onClose: () => void;
}) => {
  useEffect(() => {
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", escape, false);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", escape, false);
      document.body.style.overflow = "unset";
    };
  }, [onClose]);

  return (
    <StyledOverlay
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <FocusTrap
        focusTrapOptions={{
          initialFocus: false,
          clickOutsideDeactivates: true,
        }}
      >
        <StyledModalContent aria-modal>{children}</StyledModalContent>
      </FocusTrap>
    </StyledOverlay>
  );
};

export default Modal;
