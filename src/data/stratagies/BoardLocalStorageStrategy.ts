import { Board, BoardColumn, BoardDetails, Task } from "@/types";
import IBoardStorageStrategy from "./IBoardStorageStrategy";
import { findMaxByKey } from "@/util";

class BoardLocalStorageStrategy implements IBoardStorageStrategy {
  async getInitialData() {
    let boards: Board[] | null = null;
    let boardDetails: BoardDetails | null = null;
    boards = JSON.parse(localStorage.getItem("boards") || "") || null;
    boardDetails = JSON.parse(localStorage.getItem("boardDetails") || "") || null;
    return { boards, boardDetails };
  }

  async addBoard({ board }: { board: Board & { columns: BoardColumn[] | null } }) {
    if (!localStorage.getItem("boards")) {
      localStorage.setItem("boards", "[]");
    }
    const boards: Board[] = JSON.parse(localStorage.getItem("boards") || "[]");
    const order = findMaxByKey(boards, (b) => b.order) + 1;
    const newBoard = { ...board, order, isSelected: true };
    boards.push(newBoard);
    localStorage.setItem("boards", JSON.stringify(boards));
    localStorage.setItem("boardDetails", JSON.stringify(board));
    return newBoard;
  }

  async editBoard(board: Board & { columns: BoardColumn[] | null }) {
    if (!localStorage.getItem("boards")) {
      localStorage.setItem("boards", "[]");
    }
    const boards: (Board & { columns: BoardColumn[] | null })[] = JSON.parse(localStorage.getItem("boards")!);
    boards.forEach((x) => {
      if (x.id === board.id) {
        x.title = board.title;
        x.order = board.order;
        if (x.columns) {
          x.columns.forEach((c, i) => {
            const updatedColumn = board.columns?.find((x) => x.id === c.id);
            if (updatedColumn) {
              c.title = updatedColumn.title;
            } else {
              x.columns?.splice(i, 1);
            }
          });
          // new columns
          const newColumns = board.columns?.filter((c) => !x.columns?.some((k) => k.id === c.id));
          if (newColumns) {
            x.columns.push(...newColumns);
          }
        } else {
          x.columns = board.columns;
        }
        localStorage.setItem("boards", JSON.stringify(boards));
        localStorage.setItem("boardDetails", JSON.stringify(x));
      }
    });
    return board;
  }

  async deleteBoard(id: string) {
    let boards: Board[] = JSON.parse(localStorage.getItem("boards")!);
    boards = boards.filter((b) => b.id !== id);
    localStorage.setItem("boards", JSON.stringify(boards));
    localStorage.setItem("boardDetails", JSON.stringify(null));
    return id;
  }

  async getBoardDetails({ board }: { board: Board }): Promise<BoardDetails> {
    // in local storage we just store the entire data of a board in boards array
    let boards: BoardDetails[] | null = null;
    let boardDetails: BoardDetails | null = null;
    boards = JSON.parse(localStorage.getItem("boards") || "") || [];
    boards?.forEach((b) => {
      if (b.id === board.id) boardDetails = b;
    });
    localStorage.setItem("boardDetails", JSON.stringify(boardDetails));
    return boardDetails!;
  }

  async addTask(task: Task): Promise<Task> {
    // find the board this task belongs to
    let boards: BoardDetails[] | null = null;
    let boardDetails: BoardDetails;
    const columnId = task.columnId;
    boards = JSON.parse(localStorage.getItem("boards") || "") || [];
    boards?.forEach((board) => {
      board.columns?.forEach((c) => {
        if (c.id === columnId) {
          if (c.tasks) {
            c.tasks?.push(task);
          } else {
            c.tasks = [task];
          }
          boardDetails = board;
        }
      });
    });
    localStorage.setItem("boards", JSON.stringify(boards));
    localStorage.setItem("boardDetails", JSON.stringify(boardDetails!));
    return task;
  }

  async editTask(task: Task) {
    const boards: BoardDetails[] = JSON.parse(localStorage.getItem("boards")!);
    const boardDetails: BoardDetails = JSON.parse(localStorage.getItem("boardDetails")!);
    boardDetails?.columns?.forEach((c) => {
      c.tasks?.forEach((t, i) => {
        if (t.id === task.id) {
          c.tasks?.splice(i, 1);
        }
      });
    });
    boardDetails?.columns?.forEach((c) => {
      if (c.id === task.columnId) {
        if (c.tasks) {
          c.tasks.push(task);
        } else {
          c.tasks = [task];
        }
      }
    });
    boards.forEach((b, i) => {
      if (b.id === boardDetails.id) {
        boards[i] = boardDetails;
      }
    });
    localStorage.setItem("boards", JSON.stringify(boards));
    localStorage.setItem("boardDetails", JSON.stringify(boardDetails));
    return task;
  }

  async deleteTask(taskId: string) {
    const boards: BoardDetails[] = JSON.parse(localStorage.getItem("boards")!);
    const boardDetails: BoardDetails = JSON.parse(localStorage.getItem("boardDetails")!);
    boardDetails?.columns?.forEach((c) => {
      c.tasks?.forEach((t, i) => {
        if (t.id === taskId) {
          c.tasks?.splice(i, 1);
        }
      });
    });
    boards.forEach((b, i) => {
      if (b.id === boardDetails.id) {
        boards[i] = boardDetails;
      }
    });
    localStorage.setItem("boards", JSON.stringify(boards));
    localStorage.setItem("boardDetails", JSON.stringify(boardDetails));
    return taskId;
  }
}

export default BoardLocalStorageStrategy;
