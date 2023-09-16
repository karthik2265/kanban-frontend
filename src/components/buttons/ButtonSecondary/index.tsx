import { ReactNode } from "react";
import styled from "styled-components";

const StyledButtonSecondary = styled.div`
  border-radius: 1.25rem;
  background-color: ${(props) => (props.theme.isLightTheme ? props.theme.mainPurple + "1A" : props.theme.white)};
  filter: brightness(1.1); /* 50% brightness */
  font-size: 0.8125rem;
  width: 100%;
  height: 2.5rem;
  padding: 0.5rem 4.5rem;
  font-weight: 700;
  line-height: 1.4375rem;
  color: ${(props) => props.theme.mainPurple};
  text-align: center;
  &:hover {
    cursor: pointer;
    background-color: ${(props) => (props.theme.isLightTheme ? props.theme.mainPurpleHover + "40" : props.theme.white)};
  }

  &:active {
    scale: 0.97;
  }
`;

const ButtonSecondary = ({ children, onClick }: { children: ReactNode; onClick: () => void }) => {
  return <StyledButtonSecondary onClick={onClick}>{children}</StyledButtonSecondary>;
};

export default ButtonSecondary;
