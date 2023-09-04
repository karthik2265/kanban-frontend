import { ReactNode } from "react";
import styled from "styled-components";

const StyledExtraLargeHeading = styled.h1`
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  color: ${(props) => props.theme.primaryText};
`;

const ExtraLargeHeading = ({ children }: { children: ReactNode }) => {
  return <StyledExtraLargeHeading>{children}</StyledExtraLargeHeading>;
};

export default ExtraLargeHeading;
