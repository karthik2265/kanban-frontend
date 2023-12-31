import styled from "styled-components";

export const StyledMenuWrapper = styled.div`
  width: 100%;
  height: 6rem;
  display: flex;
  align-items: center;
  background-color: ${(props) => props.theme.primaryBg};
  border-bottom: 1px solid ${(props) => props.theme.lines};

  @media (max-width: 800px) {
    height: 5rem;
  }

  @media (max-width: 650px) {
    height: 4rem;
  }
`;

export const StyledMenuContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  gap: 2rem;
  padding: 0 1.25rem;
`;

// *** left side section -> start

export const StyledLogoWrapper = styled.div<{ $isSecondaryMenuOpen: boolean }>`
  border-right: 1px solid ${(props) => props.theme.lines};
  display: ${(props) => (props.$isSecondaryMenuOpen ? "none" : "flex")};
  justify-content: center;
  height: 100%;
  align-items: center;
  padding: 0 1.5rem;

  @media (max-width: 650px) {
    display: flex;
  }
`;

export const StyledBoardTitleWrapper = styled.div`
  @media (max-width: 650px) {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
  }
`;

export const StyledDownArrowIconWrapper = styled.div<{ $isSecondaryMenuOpen: boolean }>`
  display: none;
  @media (max-width: 650px) {
    display: block;
    transform: rotate(${(props) => (props.$isSecondaryMenuOpen ? "180deg" : "0")});
    transition: transform 0.3s ease-in-out;
    color: ${(props) => props.theme.mainPurple};
  }
`;

// **** left side section -> end

// *** right side section -> start

export const StyledLoginButton = styled.div`
  display: flex;
  padding: 0.5rem 1.5rem;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  border-radius: 1.5rem;
  border: 2px solid ${(props) => props.theme.mainPurple};

  &:hover {
    cursor: pointer;
  }

  &:active {
    scale: 0.96;
  }
`;

export const StyledAddNewTaskActionButton = styled.div<{ $isAvailable: boolean }>`
  width: 10.25rem;
  height: 3rem;
  border-radius: 1.5rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  color: ${(props) => props.theme.white};
  background-color: ${(props) => props.theme.mainPurple};
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${(props) => (props.$isAvailable ? 1 : 0.4)};

  &:hover {
    cursor: ${(props) => (props.$isAvailable ? "pointer" : "")};
  }

  &:active {
    scale: ${(props) => (props.$isAvailable ? 0.97 : 1)};
  }

  @media (max-width: 650px) {
    height: 2rem;
    width: 3rem;

    span:last-child {
      display: none;
    }
  }
`;

export const StyledActionsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  position: relative;
  z-index: 3;
`;

// *** right side secrion -> end
