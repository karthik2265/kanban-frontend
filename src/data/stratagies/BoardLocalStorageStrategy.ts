import { Board, BoardColumn, BoardDetails } from "@/types";
import IBoardStorageStrategy from "./IBoardStorageStrategy";

class BoardLocalStorageStrategy implements IBoardStorageStrategy {
  boardsCount: number = 0;

  async addBoard(board: Board & { columns: BoardColumn[] | null }) {
    if (!localStorage.getItem("boards")) {
      localStorage.setItem("boards", "[]");
    }
    const boards: Board[] = JSON.parse(localStorage.getItem("boards")!);
    this.boardsCount++;
    const newBoard = { ...board, order: this.boardsCount, isSelected: true };
    boards.push(newBoard);
    localStorage.setItem("boards", JSON.stringify(boards));
    localStorage.setItem("boardDetails", JSON.stringify(board));
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

  async getBoardDetails(id: string): Promise<BoardDetails> {
    // in local storage we just store the entire data of a board in boards array
    let boards: BoardDetails[] | null = null;
    let boardDetails: BoardDetails | null = null;
    boards = JSON.parse(localStorage.getItem("boards") || "") || [];
    boards?.forEach((board) => {
      if (board.id === id) boardDetails = board;
    });
    localStorage.setItem("boardDetails", JSON.stringify(boardDetails));
    return boardDetails!;
  }

  async updateBoard(boardToBeUpdated: BoardDetails) {
    localStorage.setItem("boardDetails", JSON.stringify(boardToBeUpdated));
    return boardToBeUpdated;
  }
}

export default BoardLocalStorageStrategy;
