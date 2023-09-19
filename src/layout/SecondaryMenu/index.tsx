// components
import {
  StyledBoardTitle,
  StyledBoardsHeader,
  StyledFooterSection,
  StyledMainSection,
  StyledThemeToggleButton,
  StyledThemeToggleIconWrapper,
  StyledToggleCircleIcon,
  StyledWrapper,
  StyledHeaderSection,
  StyledOpenSecondaryMenuButton,
  StyledSecondaryMenuAction,
  HideSideBarActionWrapper,
} from "./StyledComponents";
import CreateNewBoard from "@/components/UpdateOrCreateNewBoard";
// icons
import BoardIcon from "./BoardIcon";
import Logo from "@/components/Logo";
import SunIcon from "@/components/icons/Sun";
import MoonIcon from "@/components/icons/Moon";
import EyeSlashIcon from "@/components/icons/EyeSlash";
import EyeIcon from "@/components/icons/Eye";
// context
import { useContext, useState } from "react";
import { ThemeContext } from "@/context/ThemeContext";
import { ThemeOptions } from "@/types/styles";
import { RootLayoutContext } from "@/context/RootLayoutContext";
import { BoardContext } from "@/context/BoardContext";
import { truncateText } from "@/util";
import Modal from "@/components/Modal";

type SecondaryMenuProps = {
  boards: Board[];
};

type Board = {
  title: string;
  id: string;
};
const SecondaryMenu = ({ boards }: SecondaryMenuProps) => {
  const { toggleTheme, currentTheme } = useContext(ThemeContext)!;
  const { toggleSecondaryMenuVisibility, isSecondaryMenuOpen } = useContext(RootLayoutContext)!;
  const { selectedBoard, setSelectedBoard, boardDataManager } = useContext(BoardContext)!;
  const [isCreateNewBoardModalOpen, setIsCreateNewBoardModalOpen] = useState(false);
  return (
    <StyledWrapper $isOpen={isSecondaryMenuOpen}>
      <StyledHeaderSection>
        <Logo />
      </StyledHeaderSection>
      <StyledMainSection>
        <StyledBoardsHeader>{`ALL BOARDS (${boards.length})`}</StyledBoardsHeader>
        {boards.map((board) => {
          return (
            <StyledSecondaryMenuAction
              key={board.id}
              onClick={() => {
                toggleSecondaryMenuVisibility();
                setSelectedBoard(board.id);
              }}
              $isActive={selectedBoard === board.id}
            >
              <BoardIcon />
              <StyledBoardTitle>{truncateText(board.title, 15)}</StyledBoardTitle>
            </StyledSecondaryMenuAction>
          );
        })}
        <StyledSecondaryMenuAction
          onClick={() => {
            setIsCreateNewBoardModalOpen(true);
          }}
          $isActive={false}
        >
          <BoardIcon />
          <div>+ Create New Board</div>
        </StyledSecondaryMenuAction>
      </StyledMainSection>
      <StyledFooterSection>
        <StyledThemeToggleButton onClick={toggleTheme}>
          <SunIcon />
          <StyledThemeToggleIconWrapper>
            <StyledToggleCircleIcon $toggled={currentTheme === ThemeOptions.Dark} />
          </StyledThemeToggleIconWrapper>
          <MoonIcon />
        </StyledThemeToggleButton>
        <HideSideBarActionWrapper>
          <StyledSecondaryMenuAction $isActive={false} onClick={toggleSecondaryMenuVisibility}>
            <EyeSlashIcon />
            <div>Hide Sidebar</div>
          </StyledSecondaryMenuAction>
        </HideSideBarActionWrapper>
      </StyledFooterSection>
      <StyledOpenSecondaryMenuButton $isSecondaryMenuOpen={isSecondaryMenuOpen} onClick={toggleSecondaryMenuVisibility}>
        <EyeIcon />
      </StyledOpenSecondaryMenuButton>
      {/* create new board modal */}
      <Modal isOpen={isCreateNewBoardModalOpen} setIsOpen={setIsCreateNewBoardModalOpen}>
        <CreateNewBoard
          onSubmit={(newBoard) => {
            boardDataManager.addBoard(newBoard);
            setSelectedBoard(newBoard.id);
            // TODO show notification baord created
            setIsCreateNewBoardModalOpen(false);
          }}
        />
      </Modal>
    </StyledWrapper>
  );
};

export default SecondaryMenu;

// TODO
// * Show board name only first 50 chars or something to that effect
// * Draggable feature to arrange boards according to user preference
// * modulurize styled components
