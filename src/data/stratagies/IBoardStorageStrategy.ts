import { Board, BoardDetails } from "@/types";

interface IBoardStorageStrategy {
  boardsCount: number;
  getInitialData(): Promise<{ boards: Board[] | null; boardDetails: BoardDetails | null } | null>;
  updateBoard(board: BoardDetails): Promise<BoardDetails>;
  addBoard(board: Omit<Board, "order">): Promise<Board>;
  // addTaskToBoard(boardId: string, taskData: TaskData): ReturnType;
  // updateTaskInBoard(boardId: string, taskId: string, taskData: TaskData): ReturnType;
}

export default IBoardStorageStrategy;
