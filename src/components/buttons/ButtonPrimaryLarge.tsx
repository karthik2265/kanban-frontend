import React, { ReactNode } from "react";
import styled from "styled-components";

const StyledButtonPrimaryLarge = styled.div`
  border-radius: 1.5rem;
  background-color: ${(props) => props.theme.mainPurple};
  font-size: 0.9375rem;
  width: max-content;
  height: max-content;
  padding: 0.75rem 4.5rem;
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

const ButtonPrimaryLarge = ({ children }: { children: ReactNode }) => {
  return <StyledButtonPrimaryLarge>{children}</StyledButtonPrimaryLarge>;
};

export default ButtonPrimaryLarge;
