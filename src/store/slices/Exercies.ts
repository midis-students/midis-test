import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { useAppSelector } from '../hooks';
import { ApiExerciseResponse } from '@/lib/Service.type';

export interface ExercisesState {
  value: ApiExerciseResponse[];
}

const initialState: ExercisesState = {
  value: [],
};

export const exercisesSlice = createSlice({
  name: 'exercises',
  initialState,
  reducers: {
    setData(state, action: PayloadAction<ApiExerciseResponse[]>) {
      return {
        ...state,
        value: action.payload,
      };
    },
  },
});

export const { setData } = exercisesSlice.actions;

export const useExercise = (id: number) =>
  useAppSelector(
    (state) => state.exercises.value.find((exercise) => exercise.id === id)!
  );
export const useExercises = () =>
  useAppSelector((state) => state.exercises.value);

export default exercisesSlice.reducer;
