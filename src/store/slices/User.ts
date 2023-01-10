import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ApiProfileResponse, ProfileRole } from '@/lib/Service.type';
import type { RootState } from '@/store';
import { useAppSelector } from '@/store/hooks';

export interface UserState {
  status: 'idle' | 'loading' | 'fulfilled';
  error: string | null;
  data: ApiProfileResponse | null;
}

const initialState: UserState = { status: 'idle', error: null, data: null };

export const getUser = createAsyncThunk<
  ApiProfileResponse,
  number | undefined,
  { rejectValue: string; state: RootState }
>('user/profile', async (args = -1, thunkApi) => {
  const response = await window.api.getProfile(args);
  if ('error' in response) {
    return thunkApi.rejectWithValue(response.message);
  }
  return response.data;
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUser.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    });
    builder.addCase(getUser.rejected, (state, { payload }) => {
      if (payload) state.error = payload;
      state.status = 'idle';
    });
    builder.addCase(getUser.fulfilled, (state, { payload }) => {
      state.data = payload;
      state.status = 'fulfilled';
    });
  },
});

export const userActions = userSlice.actions;

export const useIsAdmin = () =>
  useAppSelector((state) =>
    [ProfileRole.Admin, ProfileRole.Teacher].includes(
      state.user.data?.role as ProfileRole
    )
  );

export default userSlice.reducer;
