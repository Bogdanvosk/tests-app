import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  user: null,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signInAction: (state) => {
      state.isLoading = true;
    },
    signInSuccess: (state, action) => {
      state.isLoading = false;
      state.error = '';
      state.user = action.payload;
    },
    signInError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    signUpAction: (state) => {
      state.isLoading = true;
    },
    signUpSuccess: (state, action) => {
      state.isLoading = false;
      state.error = '';
      state.user = action.payload;
    },
    signUpError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    getUserAction: (state) => {
      state.isLoading = true;
    },
    getUserSuccess: (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    },
    getUserError: (state) => {
      state.isLoading = false;
    },
    logoutAction: (state) => {
      state.isLoading = true;
    },
    logoutSuccess: (state) => {
      state.isLoading = false;
      state.user = null;
    },
    logoutError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default authSlice.reducer;

export const {
  signInAction,
  signInSuccess,
  signInError,
  signUpAction,
  signUpSuccess,
  signUpError,
  getUserAction,
  getUserSuccess,
  getUserError,
  logoutAction,
  logoutSuccess,
  logoutError,
} = authSlice.actions;
