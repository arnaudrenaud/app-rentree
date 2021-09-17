import styled from "styled-components";

import { Container } from "./App.styled";

export const StatusMessage = styled.span`
  color: ${({ success }) => (success ? "green" : "red")};
`;

export { Container };
