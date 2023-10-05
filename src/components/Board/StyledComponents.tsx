import { styled } from "styled-components";

export const StyledBoardWrapper = styled.div<{ $isColumnsAvailable: boolean }>`
  overflow: scroll;
  height: 100%;
  display: flex;
  justify-content: ${(props) => (props.$isColumnsAvailable ? "" : "center")};
  align-items: ${(props) => (props.$isColumnsAvailable ? "" : "center")};
  gap: 1.5rem;
  padding: 1rem;
`;

export const StyledColumnTasksWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.25rem;
  padding-bottom: 1.25rem;
  width: 17.5rem;
`;

export const StyledTask = styled.div`
  width: 17.5rem;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 1.25rem;
  border-radius: 0.5rem;
  background-color: ${(props) => props.theme.primaryBg};

  &:hover {
    cursor: pointer;
  }

  &:active {
    scale: 0.98;
  }
`;

export const StyledNewColumn = styled.div`
  width: 17.5rem;
  flex-shrink: 0;
  height: 80%;
  border-radius: 0.375rem;
  background: ${(props) => (props.theme.isLightTheme ? "#e4ebfa" : "rgba(62, 63, 78, 0.25)")};
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  top: 2rem;

  &::after {
    content: "+ New Column";
    width: 100%;
    text-align: center;
    font-size: 1.5rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    color: ${(props) => props.theme.secondaryText};
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  &:hover {
    cursor: pointer;
  }

  &:active {
    scale: 0.99;
  }
`;
