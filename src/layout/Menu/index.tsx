import Logo from "@/components/Logo";
import MoreOptionsIcon from "@/components/icons/MoreOptions";
import ExtraLargeHeading from "@/components/typography/ExtraLargeHeading";
import { RootLayoutContext } from "@/context/RootLayoutContext";
import { Board } from "@/types";
import { useContext, useState } from "react";
import {
  StyledMenuWrapper,
  StyledLogoWrapper,
  StyledMenuContentWrapper,
  StyledAddNewTaskActionButton,
  StyledActionsWrapper,
  StyledOptionsIconWrapper,
  StyledOptionsWrapper,
  StyledEditOption,
  StyledDeleteOption,
  StyledBoardTitleWrapper,
  StyledDownArrowIconWrapper,
} from "./StyledComponents";
import DownArrowIcon from "@/components/icons/DownArrow";
import { truncateText } from "@/util";
import Modal from "@/components/Modal";
import NewTask from "@/components/NewTask";

type MenuProps = {
  board: Omit<Board, "order"> | null;
};

const Menu = ({ board }: MenuProps) => {
  console.log("board = ", board);
  const { isSecondaryMenuOpen, toggleSecondaryMenuVisibility } = useContext(RootLayoutContext)!;
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  // modals
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);
  return (
    <StyledMenuWrapper>
      <StyledLogoWrapper $isSecondaryMenuOpen={isSecondaryMenuOpen}>
        <Logo />
      </StyledLogoWrapper>
      <StyledMenuContentWrapper>
        <StyledBoardTitleWrapper
          onClick={() => {
            if (window.matchMedia("(max-width: 650px)").matches) {
              toggleSecondaryMenuVisibility();
            }
          }}
        >
          <ExtraLargeHeading>{truncateText(board ? board.title : null, 25)}</ExtraLargeHeading>
          <StyledDownArrowIconWrapper $isSecondaryMenuOpen={isSecondaryMenuOpen}>
            <DownArrowIcon />
          </StyledDownArrowIconWrapper>
        </StyledBoardTitleWrapper>
        <StyledActionsWrapper>
          <StyledAddNewTaskActionButton
            $isAvailable={!!(board && board.columns)}
            onClick={() => {
              if (board && board.columns) {
                setIsNewTaskModalOpen(true);
              }
            }}
          >
            <div>
              <span>+</span>
              <span> Add New Task</span>
            </div>
          </StyledAddNewTaskActionButton>
          <StyledOptionsIconWrapper onClick={() => setIsOptionsOpen((prev) => !prev)}>
            <MoreOptionsIcon />
          </StyledOptionsIconWrapper>
          {isOptionsOpen && (
            <StyledOptionsWrapper>
              <StyledEditOption
                onClick={() => {
                  setIsOptionsOpen(false);
                  // TODO create edit board modal
                }}
              >
                Edit
              </StyledEditOption>
              <StyledDeleteOption
                onClick={() => {
                  setIsOptionsOpen(false);
                  // TODO create delete board modal
                }}
              >
                Delete
              </StyledDeleteOption>
            </StyledOptionsWrapper>
          )}
        </StyledActionsWrapper>
      </StyledMenuContentWrapper>
      {/* modals */}
      <Modal isOpen={isNewTaskModalOpen} setIsOpen={setIsNewTaskModalOpen}>
        {board && board.columns && (
          <NewTask
            boardColumns={board!.columns!}
            onSubmit={(newtask) => {
              setIsNewTaskModalOpen(false);
              // TODO
              // handle the data using data manager and show a notification
            }}
          />
        )}
      </Modal>
    </StyledMenuWrapper>
  );
};

export default Menu;
