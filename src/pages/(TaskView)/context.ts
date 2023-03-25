import { createContext, Dispatch, SetStateAction, useContext } from "react";

export type TaskViewResponse = Record<string, any>;

export type TaskViewContextType = {
    response: TaskViewResponse;
    setResponse: Dispatch<SetStateAction<TaskViewResponse>>;
};

export const TaskViewContext = createContext<TaskViewContextType>({
    response: {},
    setResponse: () => {
    },
});

export const useTaskView = () => useContext(TaskViewContext);
