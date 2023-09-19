import { Board } from "@/types";


interface IBoardStorageStrategy {
  boardsCount: number;
  getAllBoards(): Board[] | null;
  addBoard(board: Board): Board | null;
  updateBoard(board: Board): Board;
  // addTaskToBoard(boardId: string, taskData: TaskData): ReturnType;
  // updateTaskInBoard(boardId: string, taskId: string, taskData: TaskData): ReturnType;
}

export default IBoardStorageStrategy;
