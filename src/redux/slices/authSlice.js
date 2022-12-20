import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authAPI from "services/authAPI";

const initialState = {
  currentUser: JSON.parse(localStorage.getItem("user")) || JSON.parse(sessionStorage.getItem("user")) || {},
  isLoginLoading: false,
  isLoggedIn: false,
  isRegisterLoading: false,
  isRegisterSuccess: false,
  error: "",
};

export const login = createAsyncThunk("auth/login", async (values) => {
  try {
    // console.log(values);
    const { isRemember } = values;

    delete values["isRemember"];

    // console.log(values, remember);

    const data = await authAPI.login(values);

    // if user didn't check the "remember me checkbox", only save user info when logged in by session storage, user has to login again next time
    if (!isRemember) {
      sessionStorage.setItem("user", JSON.stringify(data));
      return data;
    }

    // if user checked the "remember me checkbox", save user info when successed logged-in to local storage to avoid user re-login
    localStorage.setItem("user", JSON.stringify(data));

    return data;
  } catch (error) {
    throw error;
  }
});

export const register = createAsyncThunk("auth/register", async (values) => {
  try {
    const data = await authAPI.register(values);

    // localStorage.setItem("user", JSON.stringify(data));
    return data;
  } catch (error) {
    throw error;
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("user");
      sessionStorage.removeItem("user");
      return { ...state, isLoggedIn: false, currentUser: {} };
    },
    resetRegisterStatus: (state) => {
      return { ...state, isRegisterSuccess: false, error: "" };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state, action) => {
      return { ...state, isLoginLoading: true, isLoggedIn: false, error: "" };
    });
    builder.addCase(login.fulfilled, (state, action) => {
      return { ...state, error: "", isLoginLoading: false, isLoggedIn: true, currentUser: action.payload };
    });
    builder.addCase(login.rejected, (state, action) => {
      return { ...state, isLoginLoading: false, isLoggedIn: false, error: action.error.message };
    });
    builder.addCase(register.pending, (state, action) => {
      return { ...state, isRegisterLoading: true, isRegisterSuccess: false, error: "" };
    });
    builder.addCase(register.fulfilled, (state, action) => {
      return { ...state, error: "", isRegisterLoading: false, isRegisterSuccess: true };
    });
    builder.addCase(register.rejected, (state, action) => {
      return { ...state, isRegisterLoading: false, isRegisterSuccess: false, error: action.error.message };
    });
  },
});

export const { logout, resetRegisterStatus } = authSlice.actions;

export default authSlice.reducer;
