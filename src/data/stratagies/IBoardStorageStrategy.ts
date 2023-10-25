import { Board, BoardColumn, BoardDetails, Task } from "@/types";

interface IBoardStorageStrategy {
  getInitialData(userId?: string): Promise<{ boards: Board[] | null; boardDetails: BoardDetails | null } | null>;
  addBoard({
    board,
    userId,
  }: {
    board: Board & { columns: BoardColumn[] | null };
    userId?: string;
  }): Promise<Board & { columns: BoardColumn[] | null }>;
  editBoard(
    board: Board & { columns: BoardColumn[] | null }
  ): Promise<Board & { columns: BoardColumn[] | null }>;
  deleteBoard(id: string): Promise<string>;
  getBoardDetails(id: string): Promise<BoardDetails>;
  addTask(task: Task): Promise<Task>;
  editTask(task: Task): Promise<Task>;
  deleteTask(taskId: string): Promise<string>;
}

export default IBoardStorageStrategy;
