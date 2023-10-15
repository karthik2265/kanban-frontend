import { Board, BoardDetails, BoardColumn, Task } from "@/types";
import IBoardStorageStrategy from "./IBoardStorageStrategy";

class BoardSupbaseStorageStrategy implements IBoardStorageStrategy {
  getInitialData(): Promise<{ boards: Board[] | null; boardDetails: BoardDetails | null } | null> {
    throw new Error("Method not implemented.");
  }
  addBoard(
    board: Omit<Board & { columns: BoardColumn[] | null }, "order">
  ): Promise<Board & { columns: BoardColumn[] | null }> {
    throw new Error("Method not implemented.");
  }
  editBoard(
    board: Omit<Board & { columns: BoardColumn[] | null }, "order">
  ): Promise<Board & { columns: BoardColumn[] | null }> {
    throw new Error("Method not implemented.");
  }
  deleteBoard(id: string): Promise<string> {
    throw new Error("Method not implemented.");
  }
  getBoardDetails(id: string): Promise<BoardDetails> {
    throw new Error("Method not implemented.");
  }
  addTask(task: Task): Promise<Task> {
    throw new Error("Method not implemented.");
  }
  editTask(task: Task): Promise<Task> {
    throw new Error("Method not implemented.");
  }
  deleteTask(taskId: string): Promise<string> {
    throw new Error("Method not implemented.");
  }
}

export default BoardSupbaseStorageStrategy;
