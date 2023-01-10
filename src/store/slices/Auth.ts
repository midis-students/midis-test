import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ApiLoginResponse } from '@/lib/Service.type';
import { useAppSelector } from '@/store/hooks';
import { getUser } from '@/store/slices/User';

export interface AuthState extends ApiLoginResponse {
  status: 'idle' | 'loading';
  error: string | null;
}

const initialState: AuthState = {
  token: sessionStorage.getItem('token'),
  status: 'idle',
  error: null,
};

export const loginUser = createAsyncThunk<
  ApiLoginResponse,
  { login: string; password: string },
  { rejectValue: string }
>('auth/login', async (args, thunkApi) => {
  const response = await window.api.login(args.login, args.password);
  if ('error' in response) {
    return thunkApi.rejectWithValue(response.message);
  }

  sessionStorage.setItem('token', response.data.token!);
  return response.data;
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      sessionStorage.clear();
      return {
        ...state,
        token: null,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    });
    builder.addCase(loginUser.rejected, (state, { payload }) => {
      if (payload) state.error = payload;
      state.status = 'idle';
    });
    builder.addCase(loginUser.fulfilled, (state, { payload }) => {
      Object.assign(state, payload);
      state.status = 'idle';
    });
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
