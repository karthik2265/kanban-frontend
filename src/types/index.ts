export type Board = {
  id: string;
  title: string;
  order: number;
};

export type BoardDetails = {
  id: string;
  title: string;
  columns:
    | (BoardColumn & {
        tasks?: Task[] | null | undefined;
      })[]
    | null;
  order: number;
};

export type BoardColumn = {
  id: string;
  title: string;
  order: number;
};

export type Task = {
  id: string;
  title: string;
  columnId: string;
  description: string | null;
  subtasks: Subtask[] | null;
  order: number;
};

export type Subtask = {
  id: string;
  taskId: string;
  value: string;
  isDone: boolean;
  order: number;
};
