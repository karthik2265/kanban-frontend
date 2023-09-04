import { ReactNode } from "react";
import styled from "styled-components";

const StyledMediumBoldBodyText = styled.h1`
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  color: ${(props) => props.theme.primaryText};
`;

const MediumBoldBodyText = ({ children }: { children: ReactNode }) => {
  return <StyledMediumBoldBodyText>{children}</StyledMediumBoldBodyText>;
};

export default MediumBoldBodyText;
