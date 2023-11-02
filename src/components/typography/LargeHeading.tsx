import { ReactNode } from "react";
import styled from "styled-components";

const StyledLargeHeading = styled.h1<{ $isDangerText: boolean; $isPrimary: boolean }>`
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  color: ${(props) =>
    props.$isDangerText ? props.theme.red : props.$isPrimary ? props.theme.primaryText : props.theme.secondaryText};
  width: 100%;
`;

const LargeHeading = ({
  children,
  isDangerText = false,
  isPrimary = true,
}: {
  children: ReactNode;
  isDangerText?: boolean;
  isPrimary?: boolean;
}) => {
  return (
    <StyledLargeHeading $isDangerText={isDangerText} $isPrimary={isPrimary}>
      {children}
    </StyledLargeHeading>
  );
};

export default LargeHeading;
