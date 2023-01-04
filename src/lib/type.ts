export type Task = {
  id: number;
  exercise: number;
  name: string;
  query: string;
  type: number;
  data: object;
};

export type Exercise = {
  id: number;
  name: string;
  type: string;
  tasks: Task[];
};
