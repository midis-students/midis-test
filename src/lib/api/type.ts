import { Modules } from '@/modules';
import { ReactNode } from 'react';

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
  data: Record<string, unknown>;
  id: number;
  name: string;
  query: string;
  payloads: number[];
  type: keyof typeof Modules;
}

export interface TaskContainer {}

export interface Variant<T = number> {
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
