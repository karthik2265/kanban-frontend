import { ReactNode } from "react";
import styled from "styled-components";

const StyledButtonPrimaryLarge = styled.div`
  border-radius: 1.5rem;
  background-color: ${(props) => props.theme.mainPurple};
  font-size: 0.9375rem;
  width: 100%;
  height: 2.5rem;
  font-weight: 700;
  line-height: 1.4375rem;
  color: ${(props) => props.theme.white};
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    cursor: pointer;
    background-color: ${(props) => props.theme.mainPurpleHover};
  }

  &:active {
    scale: 0.97;
  }
`;

const ButtonPrimaryLarge = ({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick: () => void;
}) => {
  return (
    <StyledButtonPrimaryLarge onClick={onClick}>
      {children}
    </StyledButtonPrimaryLarge>
  );
};

export default ButtonPrimaryLarge;
