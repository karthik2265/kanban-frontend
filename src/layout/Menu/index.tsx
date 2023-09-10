import Logo from "@/components/Logo";
import MoreOptionsIcon from "@/components/icons/MoreOptions";
import ExtraLargeHeading from "@/components/typography/ExtraLargeHeading";
import { RootLayoutContext } from "@/context/RootLayoutContext";
import { Board } from "@/types";
import { useContext, useState } from "react";
import styled, { css } from "styled-components";

const StyledMenuWrapper = styled.div<{ $isSecondaryMenuOpen: boolean }>`
  width: ${(props) => (props.$isSecondaryMenuOpen ? "calc(100vw - 18.75rem)" : "100vw")};
  left: ${(props) => (props.$isSecondaryMenuOpen ? "18.75rem" : "0")};
  height: 6rem;
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  background-color: ${(props) => props.theme.primaryBg};
  transition: left 0.3s ease-in-out, width 0.3s ease-in-out;
  border-bottom: 1px solid ${(props) => props.theme.lines};
`;

const StyledLogoWrapper = styled.div`
  border-right: 1px solid ${(props) => props.theme.lines};
  padding: 1.25rem;
  display: flex;
  justify-content: center;
`;

const StyledMenuContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  gap: 1rem;
  padding: 1.25rem;
`;

const StyledAddNewTaskActionButton = styled.div<{ $isAvailable: boolean }>`
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

const StyledActionsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  position: relative;
`;

const StyledOptionsIconWrapper = styled.div`
  color: ${(props) => props.theme.secondaryText};
  padding: 0.5rem;
  &:hover {
    cursor: pointer;
    color: ${(props) => props.theme.mainPurple};
  }
`;

const StyledOptionsWrapper = styled.div`
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

const styledOptionStyles = css`
  width: 10rem;
  font-size: 0.8125rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.4375rem;

  &:hover {
    cursor: pointer;
  }
`;

const StyledEditOption = styled.div`
  ${styledOptionStyles}
  color: ${(props) => props.theme.secondaryText};
  &:hover {
    color: ${(props) => props.theme.primaryText};
  }
`;

const StyledDeleteOption = styled.div`
  ${styledOptionStyles}
  color: ${(props) => props.theme.red};
  &:hover {
    color: ${(props) => props.theme.redHover};
  }
`;

type MenuProps = {
  board: Omit<Board, "order"> | null;
};

const Menu = ({ board }: MenuProps) => {
  const { isSecondaryMenuOpen } = useContext(RootLayoutContext)!;
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  return (
    <StyledMenuWrapper $isSecondaryMenuOpen={isSecondaryMenuOpen}>
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
