import { ApiTaskResponse } from '@/lib/Service.type';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useAppSelector } from '../hooks';

const initialState = {} as ApiTaskResponse;

export const taskSlice = createSlice({
  name: 'task.draft',
  initialState,
  reducers: {
    setDraftTask(state, action: PayloadAction<ApiTaskResponse>) {
      return {
        ...state,
        ...action.payload,
      };
    },
    updateName(state, action: PayloadAction<string>) {
      return {
        ...state,
        name: action.payload,
      };
    },
    updateQuery(state, action: PayloadAction<string>) {
      return {
        ...state,
        query: action.payload,
      };
    },
  },
});

export const taskActions = taskSlice.actions;

export const useDraftTask = () => useAppSelector((selector) => selector.task);

export default taskSlice.reducer;
