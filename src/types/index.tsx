export type Board = {
  id: string;
  title: string;
  columns?: BoardColumn[] | null;
  order: number;
  isSelected: boolean;
};

export type BoardColumn = {
  id: string;
  title: string;
  order: number;
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
  order: number;
};
