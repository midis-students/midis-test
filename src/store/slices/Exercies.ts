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
    addExercise(state, action: PayloadAction<ApiExerciseResponse>) {
      const prevIndex = state.value.findIndex(
        (val) => val.id === action.payload.id
      );
      if (prevIndex > -1) {
        state.value.splice(prevIndex, 1);
      }
      state.value.push(action.payload);
      return state;
    },
    setExercises(state, action: PayloadAction<ApiExerciseResponse[]>) {
      return {
        ...state,
        value: action.payload,
      };
    },
  },
});

export const { setExercises, addExercise } = exercisesSlice.actions;

export const useExercise = (id: number) =>
  useAppSelector(
    (state) => state.exercises.value.find((exercise) => exercise.id === id)!
  );
export const useExercises = () =>
  useAppSelector((state) => state.exercises.value);

export default exercisesSlice.reducer;
