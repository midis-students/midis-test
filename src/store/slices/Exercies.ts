import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Exercies } from '@/lib/type';
import { useAppSelector } from '../hooks';

export interface ExerciesState {
  value: Exercies[];
}

const initialState: ExerciesState = {
  value: [],
};

export const exerciesSlice = createSlice({
  name: 'exercies',
  initialState,
  reducers: {
    setData(state, action: PayloadAction<Exercies[]>) {
      return {
        ...state,
        value: action.payload,
      };
    },
  },
});

export const { setData } = exerciesSlice.actions;

export const useExercies = (id: number) => useAppSelector((state) => state.exercies.value[id]);

export default exerciesSlice.reducer;
