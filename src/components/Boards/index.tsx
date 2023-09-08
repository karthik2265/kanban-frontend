import styled from "styled-components";
import BoardIcon from "./BoardIcon";
import Logo from "@/components/Logo";
import SunIcon from "../icons/sun";
import MoonIcon from "../icons/Moon";
import { useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext";
import { ThemeOptions } from "@/types/styles";

const StyledWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  background-color: ${(props) => props.theme.primaryBg};
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

// *** header section -> start ***

const StyledHeaderSection = styled.div`
  display: flex;
  align-items: center;
  padding: 1.5rem;
  padding-left: 1rem; /* same as board */
  gap: 1rem;
  height: 5rem;
  color: ${(props) => props.theme.primaryText};
  font-weight: 900;
  font-size: 1.75rem;
`;

// *** header section -> end ***

// *** main section -> start ***

const StyledMainSection = styled.div`
  display: flex;
  flex-direction: column;
  color: ${(props) => props.theme.secondaryText};
  padding: 1.5rem;
  padding-top: 0;
  padding-left: 0;
  font-size: 0.9375rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  flex-grow: 1;
  border-right: ${(props) => `0.0625rem solid ${props.theme.lines}`};
`;

const StyledBoardsHeader = styled.div`
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

const StyledBoardName = styled.div`
  overflow: hidden;
  width: 90%;
  height: 1rem;
  display: flex;
  align-items: center;
`;

const StyledBoard = styled.div<{ $isActive: boolean }>`
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

  &:hover {
    cursor: ${(props) => (props.$isActive ? "" : "pointer")};
    color: ${(props) => (props.$isActive ? "" : props.theme.primaryText)};
  }
`;

const StyledCreateBoardAction = styled.div`
  font-size: 0.9375rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  color: ${(props) => props.theme.mainPurple};
  padding: 1rem; /* same as board */
  gap: 1rem; /* same as board */
  display: flex;
  align-items: center;

  &:hover {
    cursor: pointer;
    color: ${(props) => props.theme.primaryText};
  }
`;

// *** main section -> end ***

// *** footer section -> start ***

// change theme button and hide boards button
const StyledFooterSection = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 0.9375rem;
  gap: 1.5rem;
  padding: 0.75rem;
  color: ${(props) => props.theme.secondaryText};
  font-weight: 700;
  margin-bottom: 2rem;
`;

const StyledThemeToggleButton = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  width: 14.6875rem;
  height: 3rem;
  border-radius: 0.375rem;
  background-color: ${(props) => props.theme.secondaryBg};
  color: ${(props) => props.theme.secondaryText};
  &:hover {
    cursor: pointer;
  }
`;

const StyledThemeToggleIconWrapper = styled.div`
  width: 3rem;
  height: 1.5rem;
  padding: 0.25rem;
  border-radius: 1.5rem;
  background-color: ${(props) => props.theme.mainPurple};
  position: relative;
`;

const StyledToggleCircleIcon = styled.div<{ $toggled: boolean }>`
  border-radius: 50%;
  width: 1rem;
  height: 1rem;
  background-color: ${(props) => props.theme.white};
  position: absolute;
  left: ${(props) => (props.$toggled ? "1.75rem" : "0.25rem")};
  transition: left 0.3s ease-in-out;
`;

// *** footer section -> end ***

type BoardsProps = {
  boards: Board[];
  isOpen: boolean;
  onBoardSelect: (id: string) => void;
};

export type Board = {
  displayText: string;
  id: string;
  isSelected: boolean;
};
const Boards = ({ boards, isOpen, onBoardSelect }: BoardsProps) => {
  const { toggleTheme, currentTheme } = useContext(ThemeContext)!;
  if (!isOpen) return null;
  return (
    <StyledWrapper>
      <StyledHeaderSection>
        <Logo />
        <div>kanban</div>
      </StyledHeaderSection>
      <StyledMainSection>
        <StyledBoardsHeader>{`ALL BOARDS (${boards.length})`}</StyledBoardsHeader>
        {boards.map((board) => {
          return (
            <StyledBoard
              key={board.id}
              onClick={() => {
                onBoardSelect(board.id);
              }}
              $isActive={board.isSelected}
            >
              <BoardIcon />
              <StyledBoardName>{board.displayText}</StyledBoardName>
            </StyledBoard>
          );
        })}
        <StyledCreateBoardAction>
          <BoardIcon />
          <div>+ Create New Board</div>
        </StyledCreateBoardAction>
      </StyledMainSection>
      <StyledFooterSection>
        <StyledThemeToggleButton onClick={toggleTheme}>
          <SunIcon />
          <StyledThemeToggleIconWrapper>
            <StyledToggleCircleIcon $toggled={currentTheme === ThemeOptions.Dark} />
          </StyledThemeToggleIconWrapper>
          <MoonIcon />
        </StyledThemeToggleButton>
      </StyledFooterSection>
    </StyledWrapper>
  );
};

export default Boards;

// TODO
// * Show board name only first 50 chars or something to that effect
// * Draggable feature to arrange boards according to user preference
