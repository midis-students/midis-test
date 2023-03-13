import { Task } from '@/lib/api/type';
import { createContext, useContext } from 'react';

export type TaskViewResponse = Record<string, any>;

export type TaskViewContextType = {
  response: TaskViewResponse;
  setResponse: React.Dispatch<React.SetStateAction<TaskViewResponse>>;
};

export const TaskViewContext = createContext<TaskViewContextType>({
  response: {},
  setResponse: () => {},
});

export const useTaskView = () => useContext(TaskViewContext);
