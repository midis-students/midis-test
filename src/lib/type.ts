export type Task = {
  id: number;
  exercies: number;
  name: string;
  query: string;
  type: number;
  data: object;
};

export type Exercies = {
  id: number;
  name: string;
  type: string;
  tasks: Task[];
};
