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
} from "./StyledComponents";

type MenuProps = {
  board: Omit<Board, "order"> | null;
};

const Menu = ({ board }: MenuProps) => {
  const { isSecondaryMenuOpen } = useContext(RootLayoutContext)!;
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  return (
    <StyledMenuWrapper>
      {!isSecondaryMenuOpen && (
        <StyledLogoWrapper>
          <Logo />
        </StyledLogoWrapper>
      )}
      <StyledMenuContentWrapper>
        <ExtraLargeHeading>{board ? board.title : null}</ExtraLargeHeading>
        <StyledActionsWrapper>
          <StyledAddNewTaskActionButton $isAvailable={!!(board && board.columns)}>
            + Add New Task
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
    </StyledMenuWrapper>
  );
};

export default Menu;
