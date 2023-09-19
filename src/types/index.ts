export type Board = {
  id: string;
  title: string;
  columns?: BoardColumn[] | null;
  order: number;
};

export type BoardDetails = {
  columns: (BoardColumn & {
    tasks: { id: string; title: string; order: number; subTasksDone: number; totalSubTasks: number }[];
  })[];
};

export type BoardColumn = {
  id: string;
  title: string;
};

export type Task = {
  id: string;
  title: string;
  description?: string | null;
  subTasks?: SubTask[] | null;
};

export type SubTask = {
  id: string;
  value: string;
  isDone: boolean;
};
