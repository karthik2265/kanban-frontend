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

const SecondaryMenu = () => {
  const { toggleTheme, currentTheme } = useContext(ThemeContext)!;
  const { toggleSecondaryMenuVisibility, isSecondaryMenuOpen } = useContext(RootLayoutContext)!;
  const { boards, boardDetails, updateSelectedBoardAndFetchBoardDetails } = useContext(BoardContext)!;
  const [isCreateNewBoardModalOpen, setIsCreateNewBoardModalOpen] = useState(false);
  return (
    <StyledWrapper $isOpen={isSecondaryMenuOpen}>
      <StyledHeaderSection>
        <Logo />
      </StyledHeaderSection>
      <StyledMainSection>
        <StyledBoardsHeader>{`ALL BOARDS (${boards.data ? boards.data.length : 0})`}</StyledBoardsHeader>
        {boards.data &&
          boards.data.map((board) => {
            return (
              <StyledSecondaryMenuAction
                key={board.id}
                onClick={() => {
                  toggleSecondaryMenuVisibility();
                  updateSelectedBoardAndFetchBoardDetails(board);
                }}
                $isActive={board.id === boardDetails.data?.id}
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
        <CreateNewBoard onSubmit={() => setIsCreateNewBoardModalOpen(false)} />
      </Modal>
    </StyledWrapper>
  );
};

export default SecondaryMenu;

// TODO
// * Draggable feature to arrange boards according to user preference
// * modulurize styled components
