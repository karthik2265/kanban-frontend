/* 
   The board menu component size, position and trigger for open and 
   close changes based on position.

   * size and position can be managed by the board component itself and 
   * open and close can be managed by a context
  
 */

import { ReactNode, useContext } from "react";
import SecondaryMenu from "@/layout/SecondaryMenu";
import { RootLayoutContext } from "@/context/RootLayoutContext";
import { styled } from "styled-components";
import Menu from "./Menu";
import { BoardContext } from "@/context/BoardContext";
import { generateTemporaryId } from "@/util";

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
  background-color: ${(props) => props.theme.primaryBg};
  display: flex;
`;

const StyledSecondaryMenuBackground = styled.div<{ $isSecondaryMenuOpen: boolean }>`
  @media (max-width: 650px) {
    background-color: ${(props) => props.theme.black};
    opacity: 0.5;
    position: fixed;
    top: 4rem;
    height: calc(100vh - 4rem);
    width: 100vw;
    display: ${(props) => (props.$isSecondaryMenuOpen ? "block" : "none")};
  }
`;

const Layout = ({ children }: { children: ReactNode }) => {
  // need to get this data from data manager
  // remove initial data and get started it's getting too complicated
  const boards = [
    {
      title: "Fatum",
      id: "ggf",
      columns: [
        {
          id: generateTemporaryId(),
          title: "Todo",
          tasks: [{ id: generateTemporaryId(), title: "Running", subTasksDone: 2, totalSubTasks: 4, order: 1 }],
        },
        {
          id: generateTemporaryId(),
          title: "Doing",
          tasks: [
            { id: generateTemporaryId(), title: "React web app", subTasksDone: 3, totalSubTasks: 12, order: 1 },
            { id: generateTemporaryId(), title: "Supbase backend", subTasksDone: 5, totalSubTasks: 6, order: 2 },
          ],
        },
      ],
      isSelected: true,
    },
    { title: "marketing", id: "ma", columns: null, isSelected: false },
    {
      title: "connect 4 what will happen if i have a long board name like this and even more text",
      id: "c4",
      columns: null,
      isSelected: false,
    },
  ];
  const { isSecondaryMenuOpen, toggleSecondaryMenuVisibility } = useContext(RootLayoutContext)!;
  const { selectedBoard, setSelectedBoard, boardDataManager } = useContext(BoardContext)!;
  // use custom hook
  // const [boards, setBoards] = useState(() => {
    
  // })
  return (
    <StyledLayoutWrapper>
      <SecondaryMenu boards={boards} />
      <StyledMenuAndContentWrapper $isSecondaryMenuOpen={isSecondaryMenuOpen}>
        <Menu board={selectedBoard ? boards.find((x) => x.id === selectedBoard)! : null} />
        <StyledContentWrapper>{children}</StyledContentWrapper>
      </StyledMenuAndContentWrapper>
      <StyledSecondaryMenuBackground
        onClick={toggleSecondaryMenuVisibility}
        $isSecondaryMenuOpen={isSecondaryMenuOpen}
      />
    </StyledLayoutWrapper>
  );
};

export default Layout;