/* 
   The board menu component size, position and trigger for open and 
   close changes based on position.

   * size and position can be managed by the board component itself and 
   * open and close can be managed by a context
  
 */

import { useContext } from "react";
import SecondaryMenu from "@/layout/SecondaryMenu";
import { RootLayoutContext } from "@/context/RootLayoutContext";
import { styled } from "styled-components";
import Menu from "./Menu";
import { BoardContext } from "@/context/BoardContext";

const StyledMenuAndContentWrapper = styled.div<{ $isSecondaryMenuOpen: boolean }>`
  position: fixed;
  left: ${(props) => (props.$isSecondaryMenuOpen ? "18.75rem" : "0")}; /* width = secondary menu open */
  transition: left 0.3s ease-in-out;
`;

const Layout = () => {
  const boards = [
    { title: "Fatum", id: "ggf", columns: null, isSelected: true },
    { title: "marketing", id: "ma", columns: null, isSelected: false },
    {
      title: "connect 4 what will happen if i have a long board name like this",
      id: "c4",
      columns: null,
      isSelected: false,
    },
  ];
  const { isSecondaryMenuOpen } = useContext(RootLayoutContext)!;
  const { selectedBoard } = useContext(BoardContext)!;
  return (
    <div style={{ display: "flex" }}>
      <SecondaryMenu boards={boards} />
      <StyledMenuAndContentWrapper $isSecondaryMenuOpen={isSecondaryMenuOpen}>
        <Menu board={selectedBoard ? boards.find((x) => x.id === selectedBoard)! : null} />
      </StyledMenuAndContentWrapper>
    </div>
  );
};

export default Layout;

// TODO
// * put menu, secondary menu and content in a wrapper for smoother animations
