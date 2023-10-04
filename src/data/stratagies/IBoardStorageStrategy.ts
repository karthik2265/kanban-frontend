import { Board, BoardColumn, BoardDetails } from "@/types";

interface IBoardStorageStrategy {
  boardsCount: number;
  getInitialData(): Promise<{ boards: Board[] | null; boardDetails: BoardDetails | null } | null>;
  updateBoard(board: BoardDetails): Promise<BoardDetails>;
  addBoard(
    board: Omit<Board & { columns: BoardColumn[] | null }, "order">
  ): Promise<Board & { columns: BoardColumn[] | null }>;
  editBoard(
    board: Omit<Board & { columns: BoardColumn[] | null }, "order">
  ): Promise<Board & { columns: BoardColumn[] | null }>;
  deleteBoard(id: string): Promise<string>;
  getBoardDetails(id: string): Promise<BoardDetails>;
  // addTaskToBoard(boardId: string, taskData: TaskData): ReturnType;
  // updateTaskInBoard(boardId: string, taskId: string, taskData: TaskData): ReturnType;
}

export default IBoardStorageStrategy;
