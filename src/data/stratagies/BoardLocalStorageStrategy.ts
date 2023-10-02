import { Board, BoardDetails } from "@/types";
import IBoardStorageStrategy from "./IBoardStorageStrategy";

class BoardLocalStorageStrategy implements IBoardStorageStrategy {
  boardsCount: number = 0;

  async addBoard(board: Board) {
    if (!localStorage.getItem("boards")) {
      localStorage.setItem("boards", "[]");
    }
    const boards: Board[] = JSON.parse(localStorage.getItem("boards")!);
    this.boardsCount++;
    const newBoard = { ...board, order: this.boardsCount, isSelected: true };
    boards.push(newBoard);
    localStorage.setItem("boards", JSON.stringify(boards));
    return newBoard;
  }

  async getInitialData() {
    let boards: Board[] | null = null;
    let boardDetails: BoardDetails | null = null;
    boards = JSON.parse(localStorage.getItem("boards") || "") || null;
    boardDetails = JSON.parse(localStorage.getItem("boardDetails") || "") || null;
    if (boards) {
      this.boardsCount = boards.length;
    }
    return { boards, boardDetails };
  }

  async;

  async updateBoard(boardToBeUpdated: BoardDetails) {
    localStorage.setItem("boardDetails", JSON.stringify(boardToBeUpdated));
    return boardToBeUpdated;
  }
}

export default BoardLocalStorageStrategy;
