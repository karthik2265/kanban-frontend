import { ReactNode } from "react";
import styled from "styled-components";

const StyledLargeBodyText = styled.h1`
  font-size: 0.8125rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.4375rem;
  color: ${(props) => props.theme.primaryText};
`;

const LargeBodyText = ({ children }: { children: ReactNode }) => {
  return <StyledLargeBodyText>{children}</StyledLargeBodyText>;
};

export default LargeBodyText;
