import { Board } from "@/types";
import IBoardStorageStrategy from "./stratagies/IBoardStorageStrategy";

export class BoardDataManager {
  private strategy: IBoardStorageStrategy;

  constructor(strategy: IBoardStorageStrategy) {
    this.strategy = strategy;
  }

  setStrategy(newStrategy: IBoardStorageStrategy) {
    this.strategy = newStrategy;
  }

  addBoard(data: Board) {
    return this.strategy.addBoard(data);
  }

  updateBoard(data: Board) {
    return this.strategy.updateBoard(data);
  }

  getAllBoards() {
    return this.strategy.getAllBoards();
  }
}

export default BoardDataManager;
