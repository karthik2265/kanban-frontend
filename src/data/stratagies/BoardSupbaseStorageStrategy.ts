import { Board, BoardDetails, BoardColumn, Task } from "@/types";
import IBoardStorageStrategy from "./IBoardStorageStrategy";
import supbase from "@/supbaseClient";

class BoardSupbaseStorageStrategy implements IBoardStorageStrategy {
  getInitialData(): Promise<{ boards: Board[] | null; boardDetails: BoardDetails | null } | null> {
    throw new Error("Method not implemented.");
  }
  async addBoard(board: Board & { columns: BoardColumn[] | null }): Promise<Board & { columns: BoardColumn[] | null }> {
    try {
      const newlyCreatedBoard: Board & { columns: BoardColumn[] | null } = {} as Board & {
        columns: BoardColumn[] | null;
      };
      const { data: boardTableData } = await supbase
        .from("boards")
        .insert([{ title: board.title }])
        .select()
        .throwOnError();
      newlyCreatedBoard.title = boardTableData![0].title;
      newlyCreatedBoard.id = boardTableData![0].id;
      if (board.columns) {
        const { data: columnTableData } = await supbase.from("board_columns").insert(
          board.columns.map((bc) => {
            return {
              title: bc.title,
              board_id: boardTableData![0].id,
              order: bc.order,
            };
          })
        );
        newlyCreatedBoard.columns = columnTableData;
      }
      await supbase.from("board_users").insert([{ board_id: boardTableData![0].id, order: board }]);
      return newlyCreatedBoard;
    } catch (err) {
      console.error("Something went wrong while adding a new board");
      throw err;
    }
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
