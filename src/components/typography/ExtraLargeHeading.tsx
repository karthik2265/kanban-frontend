import { ReactNode } from "react";
import styled from "styled-components";

const StyledExtraLargeHeading = styled.h1`
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  color: ${(props) => props.theme.primaryText};
  width: 100%;

  @media (max-width: 800px) {
    font-size: 1.25rem;
  }

  @media (max-width: 650px) {
    font-size: 1.125rem;
  }
`;

const ExtraLargeHeading: React.FC<{ children: ReactNode; onClick?: () => void }> = ({ children, onClick }) => {
  return <StyledExtraLargeHeading onClick={onClick}>{children}</StyledExtraLargeHeading>;
};

export default ExtraLargeHeading;
