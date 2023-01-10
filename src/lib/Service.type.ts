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

export type ApiResponse<T> =
  {
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
