import { Board, BoardColumn, BoardDetails, Task } from "@/types";
import IBoardStorageStrategy from "./stratagies/IBoardStorageStrategy";

export class BoardDataManager {
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
    fetchBoardDetailsId,
  }: {
    deleteBoardId: string;
    fetchBoardDetailsId: string | null;
  }) {
    const deletedBoardId = await this.strategy.deleteBoard(deleteBoardId);
    let boardDetails: null | BoardDetails = null;
    if (fetchBoardDetailsId) {
      boardDetails = await this.strategy.getBoardDetails(fetchBoardDetailsId);
    }
    return { deletedBoardId, boardDetails };
  }

  getInitialData(userId: string | undefined) {
    return this.strategy.getInitialData(userId);
  }

  getBoardDetails(id: string) {
    return this.strategy.getBoardDetails(id);
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

  migrateDataFromLocalStorageToSupbase() {
    const boards: BoardDetails[] = JSON.parse(localStorage.getItem("boards") || "[]");
    if (boards.length <= 0) return;
  }
}

export default BoardDataManager;
