import styled from "styled-components";

const StyledButton = styled.button`
  border-radius: 6px;
`;

const Button = ({
  children,
  onClick,
}: {
  children: string;
  onClick: () => void;
}) => <StyledButton onClick={onClick}>{children}</StyledButton>;

export default Button;
