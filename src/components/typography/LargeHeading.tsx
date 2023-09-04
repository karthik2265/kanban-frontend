import { ReactNode } from "react";
import styled from "styled-components";

const StyledLargeHeading = styled.h1`
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  color: ${(props) => props.theme.primaryText};
`;

const LargeHeading = ({ children }: { children: ReactNode }) => {
  return <StyledLargeHeading>{children}</StyledLargeHeading>;
};

export default LargeHeading;
