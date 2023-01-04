import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Exercise } from '@/lib/type';
import { useAppSelector } from '../hooks';

export interface ExercisesState {
  value: Exercise[];
}

const initialState: ExercisesState = {
  value: [],
};

export const exercisesSlice = createSlice({
  name: 'exercises',
  initialState,
  reducers: {
    setData(state, action: PayloadAction<Exercise[]>) {
      return {
        ...state,
        value: action.payload,
      };
    },
  },
});

export const { setData } = exercisesSlice.actions;

export const useExercise = (id: number) => useAppSelector((state) => state.exercises.value[id]);
export const useExercises = () => useAppSelector((state) => state.exercises.value);

export default exercisesSlice.reducer;
