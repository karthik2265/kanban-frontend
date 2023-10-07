import { Board, BoardColumn, BoardDetails, Task } from "@/types";

interface IBoardStorageStrategy {
  getInitialData(): Promise<{ boards: Board[] | null; boardDetails: BoardDetails | null } | null>;
  addBoard(
    board: Omit<Board & { columns: BoardColumn[] | null }, "order">
  ): Promise<Board & { columns: BoardColumn[] | null }>;
  editBoard(
    board: Omit<Board & { columns: BoardColumn[] | null }, "order">
  ): Promise<Board & { columns: BoardColumn[] | null }>;
  deleteBoard(id: string): Promise<string>;
  getBoardDetails(id: string): Promise<BoardDetails>;
  addTask(task: Task): Promise<Task>;
}

export default IBoardStorageStrategy;
