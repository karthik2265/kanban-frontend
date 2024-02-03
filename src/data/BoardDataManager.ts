import { Board, BoardColumn, BoardDetails, Task } from "@/types";
import IBoardStorageStrategy from "./stratagies/IBoardStorageStrategy";
import BoardSupbaseStorageStrategy from "./stratagies/BoardSupbaseStorageStrategy";

class BoardDataManager {
  private strategy: IBoardStorageStrategy;

  constructor(strategy: IBoardStorageStrategy) {
    this.strategy = strategy;
    this.addBoard = this.addBoard.bind(this);
    this.editBoard = this.editBoard.bind(this);
    this.deleteBoardAndFetchBoardDetails = this.deleteBoardAndFetchBoardDetails.bind(this);
    this.getInitialData = this.getInitialData.bind(this);
    this.getBoardDetails = this.getBoardDetails.bind(this);
    this.addTask = this.addTask.bind(this);
    this.editTask = this.editTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
  }

  setStrategy(newStrategy: IBoardStorageStrategy) {
    this.strategy = newStrategy;
  }

  addBoard({ data, userId }: { data: Board & { columns: BoardColumn[] | null }; userId?: string }) {
    return this.strategy.addBoard({ board: data, userId });
  }

  editBoard(data: Board & { columns: BoardColumn[] | null }) {
    return this.strategy.editBoard(data);
  }

  async deleteBoardAndFetchBoardDetails({
    deleteBoardId,
    fetchBoard,
    userId,
  }: {
    deleteBoardId: string;
    fetchBoard: Board | null;
    userId?: string;
  }) {
    const deletedBoardId = await this.strategy.deleteBoard(deleteBoardId);
    let boardDetails: null | BoardDetails = null;
    if (fetchBoard) {
      boardDetails = await this.strategy.getBoardDetails({ board: fetchBoard, userId });
    }
    return { deletedBoardId, boardDetails };
  }

  getInitialData(userId: string | undefined) {
    return this.strategy.getInitialData(userId);
  }

  getBoardDetails({ board, userId }: { board: Board; userId?: string }) {
    return this.strategy.getBoardDetails({ board, userId });
  }

  addTask(task: Task) {
    return this.strategy.addTask(task);
  }

  editTask(task: Task) {
    return this.strategy.editTask(task);
  }

  deleteTask(taskId: string) {
    return this.strategy.deleteTask(taskId);
  }

  joinBoard({ userId, boardId, order }: { boardId: string; userId: string; order: number }) {
    if (this.strategy instanceof BoardSupbaseStorageStrategy) {
      return this.strategy.joinBoard({ userId, boardId, order });
    }
    return null;
  }

  migrateDataFromLocalStorageToSupbase() {
    const boards: BoardDetails[] = JSON.parse(localStorage.getItem("boards") || "[]");
    if (boards.length <= 0) return;
  }
}

export default BoardDataManager;
