/* 
   The board menu component size, position and trigger for open and 
   close changes based on position.

   * size and position can be managed by the board component itself and 
   * open and close can be managed by a context
  
 */

import React, { useState } from "react";
import Boards, { Board } from "@/components/Boards";

const Layout = () => {
  const [boards, setBoards] = useState([
    { displayText: "Fatum", id: "ggf", isSelected: false },
    { displayText: "marketing", id: "ma", isSelected: false },
    { displayText: "connect 4 what will happen if i have a long board name like this", id: "c4", isSelected: true },
  ]);
  const [isBoardOpen, setIsBoardOpen] = useState(false);
  return (
    <div>
      <div onClick={() => setIsBoardOpen((prev) => !prev)}>toggle boards</div>
      <Boards
        boards={boards}
        isOpen={isBoardOpen}
        onBoardSelect={(id) => {
          // redirect to boards/:id
          setBoards((boards) => {
            const updatedBoards: Board[] = [];
            boards.forEach((board) => {
              const updatedBoard = { ...board };
              if (board.id === id) updatedBoard.isSelected = true;
              else updatedBoard.isSelected = false;
              updatedBoards.push(updatedBoard);
            });
            return updatedBoards;
          });
        }}
      />
    </div>
  );
};

export default Layout;
