import { Board } from "@/types";
import IBoardStorageStrategy from "./IBoardStorageStrategy";

class BoardLocalStorageStrategy implements IBoardStorageStrategy {
  boardsCount: number = 0;
  getAllBoards() {
    let boards: Board[] | null = null;
    if (localStorage.getItem("boards")) {
      boards = JSON.parse(localStorage.getItem("boards")!);
      if (boards) {
        this.boardsCount = boards.length;
      }
    }
    return boards;
  }

  addBoard(board: Board) {
    if (!localStorage.getItem("boards")) {
      localStorage.setItem("boards", "[]");
    }
    const boards: Board[] = JSON.parse(localStorage.getItem("boards")!);
    boards.push(board);
    localStorage.setItem("boards", JSON.stringify(boards));
    this.boardsCount++;
    return board;
  }

  updateBoard(boardToBeUpdated: Board) {
    if (!localStorage.getItem("boards")) {
      localStorage.setItem("boards", "[]");
    }
    const boards: Board[] = JSON.parse(localStorage.getItem("boards")!);
    const updatedBoards = boards.map((board) => {
      if (board.id === boardToBeUpdated.id) return boardToBeUpdated;
      return board;
    });
    localStorage.setItem("boards", JSON.stringify(updatedBoards));
    return boardToBeUpdated;
  }
}

export default BoardLocalStorageStrategy;
