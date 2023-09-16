import { ReactNode } from "react";
import styled from "styled-components";

const StyledButtonPrimarySmall = styled.div`
  border-radius: 1.25rem;
  background-color: ${(props) => props.theme.mainPurple};
  font-size: 0.8125rem;
  width: 100%;
  height: 2.5rem;
  padding: 0.5rem 4.5rem;
  font-weight: 700;
  line-height: 1.4375rem;
  color: ${(props) => props.theme.white};
  &:hover {
    cursor: pointer;
    background-color: ${(props) => props.theme.mainPurpleHover};
  }

  &:active {
    scale: 0.97;
  }
`;

const ButtonPrimarySmall = ({ children }: { children: ReactNode }) => {
  return <StyledButtonPrimarySmall>{children}</StyledButtonPrimarySmall>;
};

export default ButtonPrimarySmall;
