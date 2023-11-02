import { ReactNode } from "react";
import styled from "styled-components";

const StyledMediumHeading = styled.h1`
  font-size: 0.9375rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  color: ${(props) => props.theme.primaryText};
  width: 100%;
`;

const MediumHeading = ({ children }: { children: ReactNode }) => {
  return <StyledMediumHeading>{children}</StyledMediumHeading>;
};

export default MediumHeading;
