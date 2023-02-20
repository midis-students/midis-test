export enum Roles {
  Student = 'STUDENTS',
  Teacher = 'TEACHERS',
  Admin = 'ADMIN',
}

export interface Profile {
  id: number;
  name: string;
  group: string;
  role: Roles;
}

export interface Exercise {
  id: number;
  name: string;
  type: string;
  tasks: Task[];
}

export interface Task {
  id: number;
  name: string;
  exercise: Exercise;
  type: string;
  query: string;
  data: TaskData;
}

export interface TaskData {
  objects: Record<string, any>;
  subtype: 'radio';
  options: Array<{ text: string; score: number }>;
  payloads: number[];
}

export interface Payload {
  id: number;
  blob: string;
  type: 'IMAGE';
}

export interface ApiError {
  error: string;
  message: string;
  statusCode: number;
}
