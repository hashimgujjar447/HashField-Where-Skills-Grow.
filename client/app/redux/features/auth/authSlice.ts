import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  _id?: string;
  name?: string;
  email?: string;
  avatar?: string;
  role?: string;
  [key: string]: unknown;
}

interface AuthState {
  token: string;
  user: User | null;
}

const initialState: AuthState = {
  token: "",
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    userRegistration: (state, action: PayloadAction<{ token: string }>) => {
      state.token = action.payload.token;
    },

    setAccessToken: (state, action: PayloadAction<{ accessToken: string }>) => {
      state.token = action.payload.accessToken;
    },

    setUser: (state, action: PayloadAction<{ user: User }>) => {
      state.user = action.payload.user;
    },

    userLoggedIn: (
      state,
      action: PayloadAction<{
        accessToken: string;
        user: User;
      }>,
    ) => {
      state.token = action.payload.accessToken;
      state.user = action.payload.user;
    },

    userLoggedOut: (state) => {
      state.token = "";
      state.user = null;
    },
  },
});

export const {
  userRegistration,
  setAccessToken,
  setUser,
  userLoggedIn,
  userLoggedOut,
} = authSlice.actions;

export default authSlice.reducer;
