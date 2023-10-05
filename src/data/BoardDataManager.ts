import { Board, BoardColumn, BoardDetails } from "@/types";
import IBoardStorageStrategy from "./stratagies/IBoardStorageStrategy";

export class BoardDataManager {
  private strategy: IBoardStorageStrategy;

  constructor(strategy: IBoardStorageStrategy) {
    this.strategy = strategy;
    this.addBoard = this.addBoard.bind(this);
    this.editBoard = this.editBoard.bind(this);
    this.deleteBoardAndFetchBoardDetails = this.deleteBoardAndFetchBoardDetails.bind(this);
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
