import { ReactNode } from "react";
import styled from "styled-components";

const StyledButtonDestructive = styled.div`
  border-radius: 1.25rem;
  background-color: ${(props) => props.theme.red};
  font-size: 0.8125rem;
  width: max-content;
  height: max-content;
  padding: 0.5rem 4.5rem;
  font-weight: 700;
  line-height: 1.4375rem;
  color: ${(props) => props.theme.white};
  &:hover {
    cursor: pointer;
    background-color: ${(props) => props.theme.redHover};
  }

  &:active {
    scale: 0.97;
  }
`;

const ButtonDestructive = ({ children }: { children: ReactNode }) => {
  return <StyledButtonDestructive>{children}</StyledButtonDestructive>;
};

export default ButtonDestructive;
