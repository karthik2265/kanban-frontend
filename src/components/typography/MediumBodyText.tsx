import { ReactNode } from "react";
import styled from "styled-components";

const StyledMediumBodyText = styled.h1<{ $isPrimary: boolean }>`
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.4375rem;
  color: ${(props) => (props.$isPrimary ? props.theme.primaryText : props.theme.secondaryText)};
  width: 100%;
`;

const MediumBodyText = ({ children, isPrimary = true }: { children: ReactNode; isPrimary?: boolean }) => {
  return <StyledMediumBodyText $isPrimary={isPrimary}>{children}</StyledMediumBodyText>;
};

export default MediumBodyText;
