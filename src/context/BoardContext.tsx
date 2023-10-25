import { ReactNode, createContext, useCallback, useContext, useEffect, useMemo, useReducer } from "react";
import { Board, BoardColumn, BoardDetails, Task } from "@/types";
import _ from "lodash";
import useData from "@/hooks/useData";
import { DataContext } from "./DataContext";
import { sortByKey } from "@/util";
import { UserContext } from "./UserContext";

const BoardContext = createContext<null | {
  boards: State["boards"];
  boardDetails: State["boardDetails"];
  addBoard: (board: Board & { columns: BoardColumn[] | null }) => void;
  editBoard: (board: Board & { columns: BoardColumn[] | null }) => void;
  deleteBoard: (id: string) => void;
  updateSelectedBoardAndFetchBoardDetails: (id: string) => void;
  addTask: (task: Task) => void;
  editTask: (task: Task) => void;
  deleteTask: (taskId: string) => void;
}>(null);

type Action =
  | {
      type: "UPDATE_BOARDS";
      payload: { data: Board[] | null; isProcessing: boolean; error: null | string };
    }
  | {
      type: "UPDATE_BOARD_DETAILS";
      payload: {
        data: BoardDetails | null;
        isProcessing: boolean;
        error: null | string;
      };
    }
  | {
      type: "ADD_BOARD";
      payload: {
        data: (Board & { columns: BoardColumn[] | null }) | null;
        isProcessing: boolean;
        error: null | string;
      };
    }
  | {
      type: "EDIT_BOARD";
      payload: {
        data: (Board & { columns: BoardColumn[] | null }) | null;
        isProcessing: boolean;
        error: null | string;
      };
    }
  | {
      type: "DELETE_BOARD";
      payload: {
        data: { deletedBoardId: string; boardDetails: BoardDetails | null } | null;
        isProcessing: boolean;
        error: null | string;
      };
    }
  | {
      type: "ADD_TASK";
      payload: {
        data: Task | null;
        isProcessing: boolean;
        error: null | string;
      };
    }
  | {
      type: "EDIT_TASK";
      payload: {
        data: Task | null;
        isProcessing: boolean;
        error: null | string;
      };
    }
  | {
      type: "DELETE_TASK";
      payload: {
        data: string | null;
        isProcessing: boolean;
        error: null | string;
      };
    };

type State = {
  boards: {
    data: Board[] | null;
    isProcessing: boolean;
    error: null | string;
  };
  boardDetails: {
    data: BoardDetails | null;
    isProcessing: boolean;
    error: null | string;
  };
};

const initialState: State = {
  boards: {
    data: null,
    isProcessing: false,
    error: null,
  },
  boardDetails: {
    data: null,
    isProcessing: false,
    error: null,
  },
};

function reducer(state: State, action: Action) {
  const updatedState = _.cloneDeep(state);
  switch (action.type) {
    case "UPDATE_BOARDS":
      if (action.payload.data) {
        sortByKey(action.payload.data, (b) => b.order);
      }
      updatedState.boards = { ...action.payload };
      break;
    case "UPDATE_BOARD_DETAILS":
      updatedState.boardDetails = { ...action.payload };
      break;
    case "ADD_BOARD":
      if (!updatedState.boards.data) {
        updatedState.boards.data = [];
      }
      if (action.payload.data) {
        const newBoard = action.payload.data;
        updatedState.boards.data.push(newBoard);
        sortByKey<Board>(updatedState.boards.data, (b) => b.order);
        updatedState.boardDetails.data = {
          id: newBoard.id,
          title: newBoard.title,
          columns: newBoard.columns as null,
          order: newBoard.order,
        };
      }
      updatedState.boards.isProcessing = action.payload.isProcessing;
      updatedState.boards.error = action.payload.error;
      break;
    case "EDIT_BOARD":
      if (action.payload.data) {
        const boards = updatedState.boards.data;
        const board = action.payload.data;
        boards?.forEach((x) => {
          if (x.id === board.id) {
            x.title = board.title;
            x.order = board.order;
          }
        });
        const boardDetails = updatedState.boardDetails.data;
        boardDetails!.title = board.title;
        boardDetails!.order = board.order;
        if (boardDetails?.columns) {
          boardDetails?.columns?.forEach((c, i) => {
            const updatedColumn = board.columns?.find((x) => x.id === c.id);
            if (updatedColumn) {
              c.order = updatedColumn.order;
              c.title = updatedColumn.title;
            } else {
              boardDetails.columns?.splice(i, 1);
            }
          });
          const newColumns = board.columns?.filter((c) => !boardDetails.columns?.some((k) => k.id === c.id));
          if (newColumns) {
            boardDetails.columns.push(...newColumns);
          }
        } else {
          boardDetails!.columns = board.columns as null;
        }
      }
      updatedState.boardDetails.error = action.payload.error;
      updatedState.boardDetails.isProcessing = action.payload.isProcessing;
      break;
    case "DELETE_BOARD":
      if (action.payload.data) {
        // delete the board
        updatedState.boards.data =
          updatedState.boards.data?.filter((b) => b.id !== action.payload.data?.deletedBoardId) || null;
        updatedState.boardDetails.data = null;
      }
      updatedState.boardDetails.error = action.payload.error;
      updatedState.boardDetails.isProcessing = action.payload.isProcessing;
      break;
    case "ADD_TASK":
      if (action.payload.data) {
        const task = action.payload.data;
        updatedState.boardDetails.data?.columns?.forEach((c) => {
          if (c.id === task.columnId) {
            if (c.tasks) {
              c.tasks?.push(task);
              sortByKey<Task>(c.tasks!, (t) => t.order);
            } else {
              c.tasks = [task];
            }
          }
        });
      }
      updatedState.boardDetails.isProcessing = action.payload.isProcessing;
      updatedState.boardDetails.error = action.payload.error;
      break;
    case "EDIT_TASK":
      // handle column change, title change, description change, subtasks changes
      if (action.payload.data) {
        const updatedTask = action.payload.data;
        updatedState.boardDetails.data?.columns?.forEach((c) => {
          c.tasks?.forEach((t, i) => {
            if (t.id === updatedTask.id) {
              c.tasks?.splice(i, 1);
            }
          });
        });
        updatedState.boardDetails.data?.columns?.forEach((c) => {
          if (c.id === updatedTask.columnId) {
            if (c.tasks) {
              c.tasks.push(updatedTask);
            } else {
              c.tasks = [updatedTask];
            }
          }
        });
      }
      updatedState.boardDetails.isProcessing = action.payload.isProcessing;
      updatedState.boardDetails.error = action.payload.error;
      break;
    case "DELETE_TASK":
      if (action.payload.data) {
        const deletedTaskId = action.payload.data;
        updatedState.boardDetails.data?.columns?.forEach((c) => {
          c.tasks?.forEach((t, i) => {
            if (t.id === deletedTaskId) {
              c.tasks?.splice(i, 1);
            }
          });
        });
      }
      updatedState.boardDetails.isProcessing = action.payload.isProcessing;
      updatedState.boardDetails.error = action.payload.error;
      break;
  }
  return updatedState;
}

// manage all the state here
function BoardContextProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { boardDataManager } = useContext(DataContext)!;
  const { user } = useContext(UserContext)!;
  // get all boards and board details initially
  const getInitialDataStateDispatcher = useCallback(
    (s: {
      data: { boards: Board[] | null; boardDetails: BoardDetails | null } | null;
      error: null | string;
      isProcessing: boolean;
    }) => {
      dispatch({ type: "UPDATE_BOARDS", payload: { ...s, data: s.data?.boards as null } });
      dispatch({ type: "UPDATE_BOARD_DETAILS", payload: { ...s, data: s.data?.boardDetails as null } });
    },
    [dispatch]
  );
  const { startProcessing: fetchInitialData } = useData<
    { boards: Board[] | null; boardDetails: BoardDetails | null },
    string | undefined
  >(boardDataManager.getInitialData, getInitialDataStateDispatcher);

  useEffect(() => {
    if (user) {
      fetchInitialData(user.id);
    } else {
      fetchInitialData(undefined);
    }
  }, [fetchInitialData, user]);

  // add board
  const addBoardStateDispatcher = useCallback(
    (s: { data: (Board & { columns: BoardColumn[] | null }) | null; error: null | string; isProcessing: boolean }) => {
      dispatch({ type: "ADD_BOARD", payload: s });
    },
    [dispatch]
  );
  const { startProcessing: addBoard } = useData<
    Board & { columns: BoardColumn[] | null },
    { data: Board & { columns: BoardColumn[] | null }; userId?: string }
  >(boardDataManager.addBoard, addBoardStateDispatcher);
  const addBoardHandler = useCallback(
    (board: Board & { columns: BoardColumn[] | null }) => {
      if (user) {
        addBoard({ data: board, userId: user.id });
      } else {
        addBoard({ data: board });
      }
    },
    [addBoard, user]
  );

  // update selected board meaning have to fetch board details also
  const fetchBoardDetailsStateDispatcher = useCallback(
    (s: { data: BoardDetails | null; error: null | string; isProcessing: boolean }) => {
      dispatch({ type: "UPDATE_BOARD_DETAILS", payload: { ...s } });
    },
    [dispatch]
  );
  const { startProcessing: fetchBoardDetails } = useData<BoardDetails, string>(
    boardDataManager.getBoardDetails,
    fetchBoardDetailsStateDispatcher
  );

  const updateSelectedBoardAndFetchBoardDetails = useCallback(
    (id: string) => {
      fetchBoardDetails(id);
    },
    [fetchBoardDetails]
  );

  // edit board
  // will edit both boards and board details
  const editBoardStateDispatcher = useCallback(
    (s: { data: (Board & { columns: BoardColumn[] | null }) | null; error: null | string; isProcessing: boolean }) => {
      dispatch({ type: "EDIT_BOARD", payload: s });
    },
    [dispatch]
  );
  const { startProcessing: editBoard } = useData<
    Board & { columns: BoardColumn[] | null },
    Board & { columns: BoardColumn[] | null }
  >(boardDataManager.editBoard, editBoardStateDispatcher);

  // delete board , when a board is deleted we have to fetch newly selected board details
  const deleteBoardStateDispatcher = useCallback(
    (s: {
      data: { deletedBoardId: string; boardDetails: BoardDetails | null } | null;
      isProcessing: boolean;
      error: string | null;
    }) => {
      dispatch({ type: "DELETE_BOARD", payload: s });
    },
    [dispatch]
  );
  const { startProcessing: deleteBoardAndFetchBoardDetails } = useData<
    {
      deletedBoardId: string;
      boardDetails: BoardDetails | null;
    },
    { deleteBoardId: string; fetchBoardDetailsId: string | null }
  >(boardDataManager.deleteBoardAndFetchBoardDetails, deleteBoardStateDispatcher);

  const deleteBoard = useCallback(
    (id: string) => {
      const fetchBoardDetailsId = state.boards.data ? state.boards.data.find((b) => b.id != id)?.id || null : null;
      deleteBoardAndFetchBoardDetails({ deleteBoardId: id, fetchBoardDetailsId });
    },
    [deleteBoardAndFetchBoardDetails, state.boards.data]
  );

  // add task
  const addTaskStateDispatcher = useCallback(
    (s: { data: Task | null; isProcessing: boolean; error: string | null }) => {
      dispatch({ type: "ADD_TASK", payload: s });
    },
    [dispatch]
  );
  const { startProcessing: addTask } = useData<Task, Task>(boardDataManager.addTask, addTaskStateDispatcher);

  // edit task
  const editTaskStateDispatcher = useCallback(
    (s: { data: Task | null; isProcessing: boolean; error: string | null }) => {
      dispatch({ type: "EDIT_TASK", payload: s });
    },
    [dispatch]
  );
  const { startProcessing: editTask } = useData<Task, Task>(boardDataManager.editTask, editTaskStateDispatcher);

  // delete task
  const deleteTaskStateDispatcher = useCallback(
    (s: { data: string | null; isProcessing: boolean; error: string | null }) => {
      dispatch({ type: "DELETE_TASK", payload: s });
    },
    [dispatch]
  );
  const { startProcessing: deleteTask } = useData<string, string>(
    boardDataManager.deleteTask,
    deleteTaskStateDispatcher
  );

  const providerValue = useMemo(() => {
    return {
      boards: state.boards,
      boardDetails: state.boardDetails,
      addBoard: addBoardHandler,
      editBoard,
      deleteBoard,
      updateSelectedBoardAndFetchBoardDetails,
      addTask,
      editTask,
      deleteTask,
    };
  }, [
    addBoardHandler,
    addTask,
    deleteBoard,
    deleteTask,
    editBoard,
    editTask,
    state.boardDetails,
    state.boards,
    updateSelectedBoardAndFetchBoardDetails,
  ]);

  return <BoardContext.Provider value={providerValue}>{children}</BoardContext.Provider>;
}

export { BoardContext, BoardContextProvider };
