import { styled } from "styled-components";

export const StyledWrapper = styled.div<{ $isOpen: boolean }>`
  height: 100vh;
  background-color: ${(props) => props.theme.primaryBg};
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: relative;
  z-index: 3;
  left: 0;
  top: 0;
  border-right: ${(props) => `0.0625rem solid ${props.theme.lines}`};
  width: 18.75rem; /* need this for pushing animation */
  transform: translateX(${(props) => (props.$isOpen ? "0" : "-100%")});
  transition: transform 0.3s ease-in-out;

  @media (max-width: 800px) {
    width: 16.25rem;
  }
`;

export const StyledSecondaryMenuAction = styled.div<{ $isActive: boolean }>`
  display: flex;
  align-items: center;
  gap: 1.25rem;
  width: 15rem;
  height: 3rem;
  border-top-right-radius: 6.25rem;
  border-bottom-right-radius: 6.25rem;
  background-color: ${(props) => (props.$isActive ? props.theme.mainPurple : "")};
  color: ${(props) => (props.$isActive ? props.theme.white : "")};
  padding: 1rem;
  font-size: 0.9375rem;
  font-weight: 700;

  &:hover {
    cursor: ${(props) => (props.$isActive ? "" : "pointer")};
    background-color: ${(props) =>
      props.$isActive ? "" : props.theme.isLightTheme ? props.theme.mainPurple + "1A" : props.theme.white};
    color: ${(props) => (props.$isActive ? "" : props.theme.mainPurple)};
  }
`;

// *** header section -> start ***

export const StyledHeaderSection = styled.div`
  display: flex;
  align-items: center;
  padding: 1.5rem;
  padding-left: 1rem; /* same as board */
  height: 5rem;
`;

// *** header section -> end ***

// *** main section -> start ***

export const StyledMainSection = styled.div`
  display: flex;
  flex-direction: column;
  color: ${(props) => props.theme.secondaryText};
  padding-top: 0;
  padding-left: 0;
  font-size: 0.9375rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  height: calc(100% - 13rem);
  overflow-y: scroll;
  flex-grow: 1;
`;

export const StyledBoardsHeader = styled.div`
  padding: 1rem; /* same as board */
  padding-bottom: 0;
  margin-bottom: 1.5rem;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 0.15rem;
  color: ${(props) => props.theme.secondaryText};
`;

export const StyledBoardName = styled.div`
  overflow: hidden;
  width: 90%;
  height: 1rem;
  display: flex;
  align-items: center;
`;

// *** main section -> end ***

// *** footer section -> start ***

// change theme button and hide boards button
export const StyledFooterSection = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 0.9375rem;
  gap: 1.5rem;
  color: ${(props) => props.theme.secondaryText};
  font-weight: 700;
  margin-bottom: 2rem;
  height: 8rem;
`;

export const StyledThemeToggleButton = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  width: 14.6875rem;
  height: 3rem;
  border-radius: 0.375rem;
  margin-left: 0.75rem;
  background-color: ${(props) => props.theme.secondaryBg};
  color: ${(props) => props.theme.secondaryText};
  &:hover {
    cursor: pointer;
  }
`;

export const StyledThemeToggleIconWrapper = styled.div`
  width: 3rem;
  height: 1.5rem;
  padding: 0.25rem;
  border-radius: 1.5rem;
  background-color: ${(props) => props.theme.mainPurple};
  position: relative;
`;

export const StyledToggleCircleIcon = styled.div<{ $toggled: boolean }>`
  border-radius: 50%;
  width: 1rem;
  height: 1rem;
  background-color: ${(props) => props.theme.white};
  position: absolute;
  left: ${(props) => (props.$toggled ? "1.75rem" : "0.25rem")};
  transition: left 0.3s ease-in-out;
`;

// *** footer section -> end ***

export const StyledOpenSecondaryMenuButton = styled.div<{ $isSecondaryMenuOpen: boolean }>`
  width: 3.5rem;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 1.5rem;
  border-top-right-radius: 50%;
  border-bottom-right-radius: 50%;
  position: absolute;
  right: 0;
  transform: translateX(100%);
  background-color: ${(props) => props.theme.mainPurple};
  display: ${(props) => (props.$isSecondaryMenuOpen ? "none" : "flex")};

  &:hover {
    cursor: pointer;
  }
`;
