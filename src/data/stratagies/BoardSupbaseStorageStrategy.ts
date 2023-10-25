import { Board, BoardDetails, BoardColumn, Task, Subtask } from "@/types";
import IBoardStorageStrategy from "./IBoardStorageStrategy";
import supbase from "@/supbaseClient";

class BoardSupbaseStorageStrategy implements IBoardStorageStrategy {
  async getInitialData(userId: string): Promise<{ boards: Board[] | null; boardDetails: BoardDetails | null } | null> {
    try {
      // get all boards
      const { data: boardsData } = await supbase
        .from("board_users")
        .select(`board_id, order`)
        .eq("user_id", userId)
        .throwOnError();
      const boardsUserCanSee = boardsData?.map((b) => ({ boardId: b.board_id, order: b.order }));
      if (!boardsUserCanSee) {
        return { boards: null, boardDetails: null };
      }

      const boards: Board[] = [];
      const boardsPromises =
        boardsUserCanSee?.map(async (b) => {
          const { data } = await supbase.from("boards").select().eq("id", b.boardId).throwOnError();
          boards.push({ ...data![0], order: b.order } as Board);
        }) || [];
      await Promise.all(boardsPromises);
      // get board details of selected board
      const { data: userPreferenseData } = await supbase
        .from("user_preferences")
        .select()
        .eq("user_id", userId)
        .throwOnError();
      let boardId: null | string = null;
      if (userPreferenseData) {
        boardId = userPreferenseData[0].selected_board_id;
      }
      let boardDetails: BoardDetails | null = null;
      if (boardId) {
        const { data: boardColumnsData } = await supbase
          .from("board_columns")
          .select(
            `
            id,
            title,
            order
            `
          )
          .eq("board_id", boardId)
          .throwOnError();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const boardColumnsPromises =
          boardColumnsData?.map(async (column: { [key: string]: any }) => {
            const { data: tasksData } = await supbase
              .from("tasks")
              .select(
                `
            id,
            title,
            description,
            order
            `
              )
              .eq("board_column_id", column.id);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const tasksPromises =
              tasksData?.map(async (task: { [key: string]: any }) => {
                const { data: subtasksData } = await supbase
                  .from("subtasks")
                  .select(
                    `
              id,
              value,
              is_done,
              order
              `
                  )
                  .eq("task_id", task.id)
                  .throwOnError();
                task["subtasks"] = subtasksData?.map((st) => {
                  return {
                    ...st,
                    isDone: st.is_done,
                    taskId: task.id,
                  };
                });
              }) || [];
            await Promise.all(tasksPromises);
            column["tasks"] = tasksData?.map((t) => {
              return {
                ...t,
                columnId: column.id,
              };
            });
          }) || [];
        await Promise.all(boardColumnsPromises);
        // find title, order
        boards.forEach((b) => {
          if (b.id === boardId) {
            boardDetails = {
              id: b.id,
              title: b.title,
              columns: boardColumnsData,
              order: b.order,
            };
          }
        });
      }
      return { boards, boardDetails };
    } catch (err) {
      console.error("Something went wrong while fetching initial data");
      throw err;
    }
  }

  async addBoard({
    board,
    userId,
  }: {
    board: Board & { columns: BoardColumn[] | null };
    userId?: string;
  }): Promise<Board & { columns: BoardColumn[] | null }> {
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
      newlyCreatedBoard.order = board.order;
      if (board.columns) {
        const { data: columnTableData } = await supbase
          .from("board_columns")
          .insert(
            board.columns.map((bc) => {
              return {
                title: bc.title,
                board_id: boardTableData![0].id,
                order: bc.order,
              };
            })
          )
          .select()
          .throwOnError();
        newlyCreatedBoard.columns = columnTableData;
      }
      await supbase
        .from("board_users")
        .insert([{ board_id: boardTableData![0].id, order: board.order }])
        .throwOnError();
      await supbase
        .from("user_preferences")
        .upsert({ selected_board_id: boardTableData![0].id }, { onConflict: "user_id" })
        .eq("user_id", userId)
        .throwOnError();
      return newlyCreatedBoard;
    } catch (err) {
      console.error("Something went wrong while adding a new board");
      throw err;
    }
  }

  async editBoard(
    board: Board & { columns: BoardColumn[] | null }
  ): Promise<Board & { columns: BoardColumn[] | null }> {
    try {
      // update the title in boards table
      await supbase.from("boards").update({ title: board.title }).eq("id", board.id).throwOnError();
      // update the title in columns table
      const columnsNotToBeDeleted: string[] = [];
      const columnsTableUpdatesPromises =
        board.columns?.map(async (c) => {
          const { data: columnId } = await supbase
            .from("board_columns")
            .upsert({ title: c.title, order: c.order, board_id: board.id }, { onConflict: "id" })
            .eq("id", c.id)
            .select("id")
            .throwOnError();
          columnsNotToBeDeleted.push(columnId![0].id);
        }) || [];
      await Promise.all(columnsTableUpdatesPromises);
      await supbase
        .from("board_columns")
        .delete()
        .filter("board_id", "eq", board.id)
        .filter("id", "not.in", `(${columnsNotToBeDeleted.join(",")})`)
        .throwOnError();
      return board;
    } catch (err) {
      console.error("Something went wrong while updating the board");
      throw err;
    }
  }

  async deleteBoard(id: string): Promise<string> {
    try {
      await supbase.from("boards").delete().eq("id", id);
      return id;
    } catch (err) {
      console.error("Something went wrong while deleting the board");
      throw err;
    }
  }

  getBoardDetails(id: string): Promise<BoardDetails> {
    throw new Error("Method not implemented.");
    // get order from board_users table

    // get title from boards table

    // get id, title, order of columns from columns table

    // get id, title, description, order, columnId from tasks table

    // get id, value, isDone, order from subtasks table
  }

  async addTask(task: Task): Promise<Task> {
    try {
      const { data: taskData } = await supbase
        .from("tasks")
        .insert([
          { title: task.title, board_column_id: task.columnId, description: task.description, order: task.order },
        ])
        .select()
        .throwOnError();
      const taskId = taskData![0].id;
      const newTask: Task = taskData![0];
      if (task?.subtasks) {
        const { data: subtasksData } = await supbase
          .from("subtasks")
          .insert(
            task.subtasks.map((st) => {
              return { value: st.value, task_id: taskId, is_done: st.isDone, order: st.order };
            })
          )
          .select()
          .throwOnError();
        newTask.subtasks = subtasksData;
      }
      return newTask;
    } catch (err) {
      console.error("Something went wrong while adding a new task");
      throw err;
    }
  }

  editTask(task: Task): Promise<Task> {
    throw new Error("Method not implemented.");
    // update title, columnId, order, description in tasks table

    // update value, is_done in subtasks table
  }

  async deleteTask(taskId: string): Promise<string> {
    try {
      await supbase.from("tasks").delete().eq("id", taskId);
      return taskId;
    } catch (err) {
      console.error("Something went wrong while deleting the task");
      throw err;
    }
  }
}

export default BoardSupbaseStorageStrategy;
