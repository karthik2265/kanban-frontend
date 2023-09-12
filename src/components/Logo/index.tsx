import { styled } from "styled-components";

const LogoIcon = () => {
  return (
    <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="6" height="25" rx="2" fill="#635FC7" />
      <rect opacity="0.75" x="9" width="6" height="25" rx="2" fill="#635FC7" />
      <rect opacity="0.5" x="18" width="6" height="25" rx="2" fill="#635FC7" />
    </svg>
  );
};

const StyledLogoText = styled.div`
  color: ${(props) => props.theme.primaryText};
  font-weight: 900;
  font-size: 1.75rem;

  @media (max-width: 650px) {
    display: none;
  }
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  width: max-content;
  height: max-content;
`;

const Logo = () => {
  return (
    <LogoWrapper>
      <LogoIcon />
      <StyledLogoText>kanban</StyledLogoText>
    </LogoWrapper>
  );
};

export default Logo;
