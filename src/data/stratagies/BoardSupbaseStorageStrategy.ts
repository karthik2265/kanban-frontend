import { Board, BoardDetails, BoardColumn, Task } from "@/types";
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
        const boardColumnsPromises =
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
            const tasksPromises =
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
        .upsert({ selected_board_id: boardTableData![0].id, user_id: userId }, { onConflict: "user_id" })
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
            .upsert({ title: c.title, order: c.order, board_id: board.id, id: c.id }, { onConflict: "id" })
            .select("id")
            .throwOnError();
          columnsNotToBeDeleted.push(columnId![0].id);
          c.id = columnId![0].id;
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

  async getBoardDetails({ board, userId }: { board: Board; userId?: string }): Promise<BoardDetails> {
    try {
      // get id, title, order of columns from columns table
      const { data: boardColumnsData } = await supbase
        .from("board_columns")
        .select(
          `
            id,
            title,
            order
            `
        )
        .eq("board_id", board.id)
        .throwOnError();
      const boardColumnsPromises =
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
          const tasksPromises =
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
      await supbase
        .from("user_preferences")
        .upsert({ selected_board_id: board.id, user_id: userId }, { onConflict: "user_id" })
        .throwOnError();
      const boardDetails = {
        id: board.id,
        title: board.title,
        order: board.order,
        columns: boardColumnsData,
      } as BoardDetails;
      return boardDetails;
    } catch (err) {
      console.error("Something went wrong while fetching board details");
      throw err;
    }
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
      newTask.columnId = taskData![0].board_column_id;
      if (task?.subtasks) {
        const { data: subtasksData } = await supbase
          .from("subtasks")
          .insert(
            task.subtasks.map((st) => {
              return { value: st.value, task_id: taskId, is_done: st.isDone, order: st.order };
            })
          )
          .select(`id, value, task_id, is_done, order`)
          .throwOnError();
        newTask.subtasks =
          subtasksData?.map((st) => ({
            id: st.id,
            value: st.value,
            taskId: st.task_id,
            isDone: st.is_done,
            order: st.order,
          })) || [];
      }
      return newTask;
    } catch (err) {
      console.error("Something went wrong while adding a new task");
      throw err;
    }
  }

  async editTask(task: Task): Promise<Task> {
    try {
      console.log("task to be edited", task);
      // update title, columnId, order, description in tasks table
      await supbase
        .from("tasks")
        .update({ title: task.title, board_column_id: task.columnId, description: task.description, order: task.order })
        .eq("id", task.id)
        .throwOnError();
      // update value, is_done in subtasks table
      const subtasksNotToBeDeleted: string[] = [];
      const subtasksPromises =
        task.subtasks?.map(async (st) => {
          const { data: subtaskId } = await supbase
            .from("subtasks")
            .upsert({
              id: st.id,
              value: st.value,
              is_done: st.isDone,
              order: st.order,
              task_id: st.taskId,
            })
            .eq("task_id", task.id)
            .select("id")
            .throwOnError();
          st.id = subtaskId![0]!.id;
          subtasksNotToBeDeleted.push(st.id);
        }) || [];
      await Promise.all(subtasksPromises);
      await supbase
        .from("subtasks")
        .delete()
        .filter("task_id", "eq", task.id)
        .filter("id", "not.in", `(${subtasksNotToBeDeleted.join(",")})`)
        .throwOnError();
      return task;
    } catch (err) {
      console.error("Something went wrong while updating the task");
      throw err;
    }
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
