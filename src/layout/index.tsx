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
  height: 100%;
  width: ${(props) => (props.$isSecondaryMenuOpen ? "calc(100vw - 18.75rem)" : "100vw")};
  left: ${(props) => (props.$isSecondaryMenuOpen ? "18.75rem" : "0")}; /* width = secondary menu open */
  transition: left 0.3s ease-in-out;

  @media (max-width: 800px) {
    left: ${(props) => (props.$isSecondaryMenuOpen ? "16.25rem" : "0")};
    width: ${(props) => (props.$isSecondaryMenuOpen ? "calc(100vw - 16.25rem)" : "100vw")};
  }

  @media (max-width: 650px) {
    left: 0;
    width: 100vw;
  }
`;

const StyledContentWrapper = styled.div`
  background-color: ${(props) => props.theme.secondaryBg};
  width: 100%;
  height: 100%;
  position: fixed;
  top: 6rem;
  @media (max-width: 800px) {
    top: 5rem;
  }

  @media (max-width: 650px) {
    top: 4rem;
  }
`;

const StyledLayoutWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${props => props.theme.primaryBg};
  display: flex;
`

const Layout = () => {
  const boards = [
    { title: "Fatum", id: "ggf", columns: null, isSelected: true },
    { title: "marketing", id: "ma", columns: null, isSelected: false },
    {
      title: "connect 4 what will happen if i have a long board name like this and even more text",
      id: "c4",
      columns: null,
      isSelected: false,
    },
  ];
  const { isSecondaryMenuOpen } = useContext(RootLayoutContext)!;
  const { selectedBoard } = useContext(BoardContext)!;
  return (
    <StyledLayoutWrapper>
      <SecondaryMenu boards={boards} />
      <StyledMenuAndContentWrapper $isSecondaryMenuOpen={isSecondaryMenuOpen}>
        <Menu board={selectedBoard ? boards.find((x) => x.id === selectedBoard)! : null} />
        <StyledContentWrapper>main content</StyledContentWrapper>
      </StyledMenuAndContentWrapper>
    </StyledLayoutWrapper>
  );
};

export default Layout;

// TODO
// * put menu, secondary menu and content in a wrapper for smoother animations
