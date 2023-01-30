export interface ApiLoginResponse {
  token: string | null;
}

export enum ProfileRole {
  Student = 'STUDENT',
  Teacher = 'TEACHER',
  Admin = 'ADMIN',
}

export interface ApiProfileResponse {
  id: number;
  name: string;
  group: string;
  role: ProfileRole;
}

export interface ApiExerciseResponse {
  id: number;
  name: string;
  type: string;
  tasks: ApiTaskResponse[];
}

export interface ApiTaskResponse {
  id: number;
  name: string;
  exercise: ApiExerciseResponse;
  type: string;
  query: string;
  data: string;
}

export type ApiResponse<T> =
  | {
      data: T;
      status: number;
    }
  | ApiError;

export interface ApiError {
  error: string;
  message: string;
  status: number;
  data: undefined;
}
