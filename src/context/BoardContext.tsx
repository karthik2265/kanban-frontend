import { ReactNode, createContext, useCallback, useContext, useEffect, useReducer } from "react";
import { Board, BoardColumn, BoardDetails, Task } from "@/types";
import _ from "lodash";
import useData from "@/hooks/useData";
import { DataContext } from "./DataContext";

const BoardContext = createContext<null | {
  boards: State["boards"];
  boardDetails: State["boardDetails"];
  task: State["task"];
  addBoard: (board: Omit<Board, "order"> & { columns: BoardColumn[] | null }) => void;
  editBoard: (board: Board & { columns: BoardColumn[] | null }) => void;
  deleteBoard: (id: string) => void;
  updateSelectedBoardAndFetchBoardDetails: (id: string) => void;
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
      type: "UPDATE_TASK";
      payload: {
        data: Task | null;
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
  task: {
    data: Task | null;
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
  task: {
    data: null,
    isProcessing: false,
    error: null,
  },
};

function reducer(state: State, action: Action) {
  const updatedState = _.cloneDeep(state);
  switch (action.type) {
    case "UPDATE_BOARDS":
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
        updatedState.boardDetails.data = { id: newBoard.id, title: newBoard.title, columns: newBoard.columns as null };
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
        // select another board
        updatedState.boardDetails.data = action.payload.data.boardDetails;
      }
      updatedState.boardDetails.error = action.payload.error;
      updatedState.boardDetails.isProcessing = action.payload.isProcessing;
      break;
    case "UPDATE_TASK":
      updatedState.task = { ...action.payload };
      break;
  }
  return updatedState;
}

// manage all the state here
// 1) fetching all boards and select board details, lodaing and error states
// 2) update selected board and fetching the newly selected board details, lodaing and error states
// 3) creating or updating tasks in a board, loading and error states
function BoardContextProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { boardDataManager } = useContext(DataContext)!;
  // get all boards and board details initially
  const { startProcessing: fetchInitialData } = useData<
    { boards: Board[] | null; boardDetails: BoardDetails | null },
    void
  >(boardDataManager.getInitialData, (s) => {
    dispatch({ type: "UPDATE_BOARDS", payload: { ...s, data: s.data?.boards as null } });
    dispatch({ type: "UPDATE_BOARD_DETAILS", payload: { ...s, data: s.data?.boardDetails as null } });
  });

  useEffect(() => {
    fetchInitialData();
  }, []);

  // add board
  const { startProcessing: addBoard } = useData<
    Board & { columns: BoardColumn[] | null },
    Omit<Board & { columns: BoardColumn[] | null }, "order">
  >(boardDataManager.addBoard, (s) => {
    dispatch({ type: "ADD_BOARD", payload: { ...s } });
  });

  // update selected board meaning have to fetch board details also
  const { startProcessing: fetchBoardDetails } = useData<BoardDetails, string>(
    boardDataManager.getBoardDetails,
    (s) => {
      dispatch({ type: "UPDATE_BOARD_DETAILS", payload: { ...s } });
    }
  );

  function updateSelectedBoardAndFetchBoardDetails(id: string) {
    fetchBoardDetails(id);
  }

  // edit board
  const { startProcessing: editBoard } = useData<
    Board & { columns: BoardColumn[] | null },
    Board & { columns: BoardColumn[] | null }
  >(boardDataManager.editBoard, (s) => {
    // will edit both boards and board details
    dispatch({ type: "EDIT_BOARD", payload: { ...s } });
  });

  // delete board , when a board is deleted we have to fetch newly selected board details
  const { startProcessing: deleteBoardAndFetchBoardDetails } = useData<
    {
      deletedBoardId: string;
      boardDetails: BoardDetails | null;
    },
    { deleteBoardId: string; fetchBoardDetailsId: string | null }
  >(boardDataManager.deleteBoardAndFetchBoardDetails, (s) => {
    dispatch({ type: "DELETE_BOARD", payload: { ...s } });
  });

  function deleteBoard(id: string) {
    const fetchBoardDetailsId = state.boards.data ? state.boards.data[0].id : null;
    deleteBoardAndFetchBoardDetails({ deleteBoardId: id, fetchBoardDetailsId });
  }

  return (
    <BoardContext.Provider
      value={{
        boards: state.boards,
        boardDetails: state.boardDetails,
        task: state.task,
        addBoard,
        editBoard,
        deleteBoard,
        updateSelectedBoardAndFetchBoardDetails,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
}

export { BoardContext, BoardContextProvider };
