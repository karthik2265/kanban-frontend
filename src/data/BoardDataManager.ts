import { Board, BoardColumn, BoardDetails } from "@/types";
import IBoardStorageStrategy from "./stratagies/IBoardStorageStrategy";

export class BoardDataManager {
  private strategy: IBoardStorageStrategy;

  constructor(strategy: IBoardStorageStrategy) {
    this.strategy = strategy;
    this.addBoard = this.addBoard.bind(this);
    this.updateBoard = this.updateBoard.bind(this);
    this.getInitialData = this.getInitialData.bind(this);
    this.getBoardDetails = this.getBoardDetails.bind(this);
  }

  setStrategy(newStrategy: IBoardStorageStrategy) {
    this.strategy = newStrategy;
  }

  addBoard(data: Omit<Board & { columns: BoardColumn[] | null }, "order">) {
    return this.strategy.addBoard(data);
  }

  updateBoard(data: BoardDetails) {
    return this.strategy.updateBoard(data);
  }

  getInitialData() {
    return this.strategy.getInitialData();
  }

  getBoardDetails(id: string) {
    return this.strategy.getBoardDetails(id);
  }
}

export default BoardDataManager;
