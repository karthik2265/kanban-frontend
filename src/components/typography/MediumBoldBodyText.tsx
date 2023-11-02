import { ReactNode } from "react";
import styled from "styled-components";

const StyledMediumBoldBodyText = styled.h1<{ $isPrimary: boolean }>`
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  color: ${(props) => (props.$isPrimary ? props.theme.primaryText : props.theme.secondaryText)};
  width: 100%;
`;

const MediumBoldBodyText = ({ children, isPrimary = true }: { children: ReactNode; isPrimary?: boolean }) => {
  return <StyledMediumBoldBodyText $isPrimary={isPrimary}>{children}</StyledMediumBoldBodyText>;
};

export default MediumBoldBodyText;
