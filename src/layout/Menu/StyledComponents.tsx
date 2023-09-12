import styled, { css } from "styled-components";

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

// TODO use react truncate library
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
`;

export const StyledOptionsIconWrapper = styled.div`
  color: ${(props) => props.theme.secondaryText};
  &:hover {
    cursor: pointer;
    color: ${(props) => props.theme.mainPurple};
  }
`;

export const StyledOptionsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;
  flex-wrap: wrap;
  gap: 1rem;
  position: absolute;
  right: 0;
  top: calc(100% + 1rem);
  background-color: ${(props) => props.theme.secondaryBg};
  width: 12rem;
  height: 5.875rem;
  border-radius: 0.5rem;
`;

export const styledOptionStyles = css`
  width: 10rem;
  font-size: 0.8125rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.4375rem;

  &:hover {
    cursor: pointer;
  }
`;

export const StyledEditOption = styled.div`
  ${styledOptionStyles}
  color: ${(props) => props.theme.secondaryText};
  &:hover {
    color: ${(props) => props.theme.primaryText};
  }
`;

export const StyledDeleteOption = styled.div`
  ${styledOptionStyles}
  color: ${(props) => props.theme.red};
  &:hover {
    color: ${(props) => props.theme.redHover};
  }
`;

// *** right side secrion -> end
