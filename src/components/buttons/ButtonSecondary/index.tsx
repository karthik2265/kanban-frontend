import { ReactNode } from "react";
import styled from "styled-components";

const StyledButtonSecondary = styled.div`
  border-radius: 1.25rem;
  background-color: ${(props) => (props.theme.isLightTheme ? props.theme.mainPurple + "1A" : props.theme.white)};
  filter: brightness(1.1); /* 50% brightness */
  font-size: 0.8125rem;
  width: max-content;
  height: max-content;
  padding: 0.5rem 4.5rem;
  font-weight: 700;
  line-height: 1.4375rem;
  color: ${(props) => props.theme.mainPurple};
  &:hover {
    cursor: pointer;
    background-color: ${(props) => (props.theme.isLightTheme ? props.theme.mainPurpleHover + "40" : props.theme.white)};
  }

  &:active {
    scale: 0.97;
  }
`;

const ButtonSecondary = ({ children }: { children: ReactNode }) => {
  return <StyledButtonSecondary>{children}</StyledButtonSecondary>;
};

export default ButtonSecondary;
