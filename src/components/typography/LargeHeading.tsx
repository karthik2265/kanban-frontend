import { ReactNode } from "react";
import styled from "styled-components";

const StyledLargeHeading = styled.h1<{ $isDangerText: boolean }>`
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  color: ${(props) => (props.$isDangerText ? props.theme.red : props.theme.primaryText)};
`;

const LargeHeading = ({ children, isDangerText = false }: { children: ReactNode; isDangerText?: boolean }) => {
  return <StyledLargeHeading $isDangerText={isDangerText}>{children}</StyledLargeHeading>;
};

export default LargeHeading;
