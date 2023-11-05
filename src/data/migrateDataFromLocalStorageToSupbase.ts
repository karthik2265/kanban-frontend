import supabase from "@/supbaseClient";
import { BoardDetails } from "@/types";

async function migrateDataFromLocalStorageToSupbase(userId: string) {
  try {
    let boards = JSON.parse(localStorage.getItem("boards") || "[]") as BoardDetails[];
    const selectedBoard = JSON.parse(localStorage.getItem("boardDetails") || "") as BoardDetails;
    boards = boards.filter((x) => x.id != selectedBoard.id);
    const boardsPromises = boards.map(async (board) => {
      const { data: boardTableData } = await supabase
        .from("boards")
        .insert({ title: board.title })
        .select(`id`)
        .throwOnError();
      const boardId = boardTableData![0].id;
      await supabase
        .from("board_users")
        .insert({ board_id: boardId, user_id: userId, order: board.order })
        .throwOnError();
      const columnsPromises =
        board.columns?.map(async (c) => {
          const { data: columnTableData } = await supabase
            .from("board_columns")
            .insert({ title: c.title, order: c.order, board_id: boardId })
            .select(`id`)
            .throwOnError();
          const columnId = columnTableData![0].id;
          const tasksPromises =
            c.tasks?.map(async (t) => {
              const { data: taskTableData } = await supabase
                .from("tasks")
                .insert({ title: t.title, order: t.order, description: t.description, board_column_id: columnId })
                .select(`id`)
                .throwOnError();
              const taskId = taskTableData![0].id;
              const subtasksPromises =
                t.subtasks?.map(async (st) => {
                  await supabase
                    .from("subtasks")
                    .insert({ value: st.value, order: st.order, is_done: st.isDone, task_id: taskId })
                    .throwOnError();
                }) || [];
              await Promise.all(subtasksPromises);
            }) || [];

          await Promise.all(tasksPromises);
        }) || [];
      await Promise.all(columnsPromises);
    });
    await Promise.all(boardsPromises);

    if (selectedBoard) {
      const { data: boardTableData } = await supabase
        .from("boards")
        .insert({ title: selectedBoard.title })
        .select(`id`)
        .throwOnError();
      const boardId = boardTableData![0].id;
      await supabase
        .from("user_preferences")
        .upsert({ user_id: userId, selected_board_id: boardId }, { onConflict: "user_id" })
        .throwOnError();
      await supabase
        .from("board_users")
        .insert({ user_id: userId, board_id: boardId, order: selectedBoard.order })
        .throwOnError();
      const columnsPromises =
        selectedBoard.columns?.map(async (c) => {
          const { data: columnTableData } = await supabase
            .from("board_columns")
            .insert({ title: c.title, order: c.order, board_id: boardId })
            .select(`id`)
            .throwOnError();
          const columnId = columnTableData![0].id;
          const tasksPromises =
            c.tasks?.map(async (t) => {
              const { data: taskTableData } = await supabase
                .from("tasks")
                .insert({ title: t.title, description: t.description, order: t.order, board_column_id: columnId })
                .select(`id`)
                .throwOnError();
              const taskId = taskTableData![0].id;
              const subtasksPromises =
                t.subtasks?.map(async (st) => {
                  await supabase
                    .from("subtasks")
                    .insert({ value: st.value, order: st.order, is_done: st.isDone, task_id: taskId })
                    .throwOnError();
                }) || [];
              await Promise.all(subtasksPromises);
            }) || [];
          await Promise.all(tasksPromises);
        }) || [];
      await Promise.all(columnsPromises);
    }

    localStorage.removeItem("boards");
    localStorage.removeItem("boardDetails");
  } catch (err) {
    console.log("Something went wrong while migrating data from local storage to supbase");
    throw err;
  }
}

export default migrateDataFromLocalStorageToSupbase;
