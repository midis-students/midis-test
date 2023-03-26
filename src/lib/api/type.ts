import { Modules } from '@/modules';

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
  answered?: number;
}

export interface Task {
  data: any;
  id: number;
  name: string;
  query: string;
  payloads: Payload[];
  type: keyof typeof Modules;
  answer: boolean | null;
}

export interface Payload {
  id: number;
  type: 'IMAGE';
  description: string;
}

export interface Variant<T = number> {
  id: string;
  value: T;
  label: string;
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

export type TaskWithAnswer = Task & {
  answers: Array<{
    isCorrect: boolean;
    user: Profile;
  }>;
};
