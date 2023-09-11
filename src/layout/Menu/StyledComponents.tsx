import styled, { css } from "styled-components";

export const StyledMenuWrapper = styled.div`
  width: 100%;
  height: 6rem;
  display: flex;
  align-items: center;
  background-color: ${props => props.theme.primaryBg};
  border-bottom: 1px solid ${(props) => props.theme.lines};
`;

export const StyledLogoWrapper = styled.div`
  border-right: 1px solid ${(props) => props.theme.lines};
  padding: 1.25rem;
  display: flex;
  justify-content: center;
`;

export const StyledMenuContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  gap: 1rem;
  padding: 1.25rem;
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
`;

export const StyledActionsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  position: relative;
`;

export const StyledOptionsIconWrapper = styled.div`
  color: ${(props) => props.theme.secondaryText};
  padding: 0.5rem;
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
