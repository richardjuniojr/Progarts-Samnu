import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { auth } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
} from "firebase/auth";

// Action to register a new user
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ email, password }) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    return userCredential.user;
  }
);

// Action to login an existing user
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);

    return userCredential.user;
  }
);

// Action to logout the current user
export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  await signOut(auth);
});

// Action to reset user password
export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (email) => {
    await sendPasswordResetEmail(auth, email);
  }
);

// Action to get the current user
export const getUser = createAsyncThunk("auth/getUser", async () => {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // Extract serializable properties
        const { uid, email, displayName, photoURL } = user;
        resolve({ uid, email, displayName, photoURL });
      } else {
        reject("No user is currently signed in.");
      }
    });
  });
});


const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(forgotPassword.pending, (state) => {
        state.status = "loading";
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.user = null;
        state.error = action.error.message;
      });
  },
});

export default authSlice.reducer;
