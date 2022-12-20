import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import adminAPI from "services/adminAPI";
import ticketsAPI from "services/ticketsAPI";

const initialState = {
  movieList: [],
  editMovieData: {},
  userList: [],
  editUserDate: {},
  isLoaidng: false,
  actionResponeAPI: null,
  actionSuccess: null,
  error: "",
};

export const getMovieList = createAsyncThunk("admin/getMovieList", async (keyword = "") => {
  try {
    const data = await adminAPI.getMovieList(keyword);
    return data;
  } catch (error) {
    throw error;
  }
});

export const addMovie = createAsyncThunk("admin/addMovie", async (FormData) => {
  try {
    const data = await adminAPI.addMovie(FormData);
    return data;
  } catch (error) {
    throw error;
  }
});

export const fetchEditMovieData = createAsyncThunk("admin/fetchEditMovieData", async (movieId) => {
  try {
    const data = await adminAPI.fecthEditMovieData(movieId);
    return data;
  } catch (error) {
    throw error;
  }
});

export const updateMovie = createAsyncThunk("admin/updateMovie", async (FormData) => {
  try {
    const data = await adminAPI.updateMovie(FormData);
    return data;
  } catch (error) {
    throw error;
  }
});

export const deleteMovie = createAsyncThunk("admin/deleteMovie", async (movieId) => {
  try {
    const data = await adminAPI.deleteMovie(movieId);
    return data;
  } catch (error) {
    throw error;
  }
});

export const createShowtime = createAsyncThunk("admin/createShowtime", async (showtime) => {
  try {
    const data = await ticketsAPI.createShowtime(showtime);
    return data;
  } catch (error) {
    throw error;
  }
});

export const getUserList = createAsyncThunk("admin/getUserList", async (keyword = "") => {
  try {
    const data = await adminAPI.getUserList(keyword);
    return data;
  } catch (error) {
    throw error;
  }
});

export const addUser = createAsyncThunk("admin/addUser", async (values) => {
  try {
    const data = await adminAPI.addUser(values);
    return data;
  } catch (error) {
    throw error;
  }
});

export const fetchEditUserData = createAsyncThunk("admin/fetchEditUserData", async (accountName) => {
  try {
    const data = await adminAPI.fecthEditUserData(accountName);
    return data;
  } catch (error) {
    throw error;
  }
});

export const deleteUser = createAsyncThunk("admin/deleteUser", async (account) => {
  try {
    const data = await adminAPI.deleteUser(account);
    return data;
  } catch (error) {
    throw error;
  }
});

export const updateUser = createAsyncThunk("admin/updateUser", async (values) => {
  try {
    const data = await adminAPI.updateUser(values);
    return data;
  } catch (error) {
    throw error;
  }
});

const adminSlice = createSlice({
  name: "admin",
  initialState: initialState,
  reducers: {
    resetAdminActionStatus: (state) => {
      return { ...state, isLoaidng: false, actionSuccess: null, actionResponeAPI: null, error: "" };
    },
    resetAdminReducer: (state) => {
      return {
        ...state,
        movieList: [],
        editMovieData: {},
        userList: [],
        editUserDate: {},
        isLoaidng: false,
        actionResponeAPI: null,
        actionSuccess: null,
        error: "",
      };
    },
  },
  extraReducers: (builder) => {
    // GET MOVIE LIST
    builder.addCase(getMovieList.pending, (state) => {
      return { ...state, isLoading: true };
    });
    builder.addCase(getMovieList.fulfilled, (state, action) => {
      return { ...state, isLoading: false, movieList: action.payload };
    });
    builder.addCase(getMovieList.rejected, (state, action) => {
      return { ...state, isLoading: false, error: action.error.message };
    });
    // ADD MOVIE
    builder.addCase(addMovie.pending, (state) => {
      return { ...state, isLoading: true };
    });
    builder.addCase(addMovie.fulfilled, (state, action) => {
      return { ...state, isLoading: false, actionSuccess: true, actionResponeAPI: action.payload };
    });
    builder.addCase(addMovie.rejected, (state, action) => {
      return { ...state, isLoading: false, actionSuccess: false, error: action.error.message };
    });
    // EDIT MOVIE
    builder.addCase(fetchEditMovieData.pending, (state) => {
      return { ...state, isLoading: true };
    });
    builder.addCase(fetchEditMovieData.fulfilled, (state, action) => {
      return { ...state, isLoading: false, editMovieData: action.payload };
    });
    builder.addCase(fetchEditMovieData.rejected, (state, action) => {
      return { ...state, isLoading: false, actionSuccess: false, error: action.error.message };
    });
    // UPDATE MOVIE
    builder.addCase(updateMovie.pending, (state) => {
      return { ...state, isLoading: true };
    });
    builder.addCase(updateMovie.fulfilled, (state, action) => {
      return { ...state, isLoading: false, actionSuccess: true, actionResponeAPI: action.payload };
    });
    builder.addCase(updateMovie.rejected, (state, action) => {
      return { ...state, isLoading: false, actionSuccess: false, error: action.error.message };
    });
    // DELETE MOVIE
    builder.addCase(deleteMovie.pending, (state) => {
      return { ...state, isLoading: true };
    });
    builder.addCase(deleteMovie.fulfilled, (state, action) => {
      return { ...state, isLoading: false, actionSuccess: true, actionResponeAPI: action.payload };
    });
    builder.addCase(deleteMovie.rejected, (state, action) => {
      return { ...state, isLoading: false, actionSuccess: false, error: action.error.message };
    });
    // CREATE SHOWTIME
    builder.addCase(createShowtime.pending, (state) => {
      return { ...state, isLoading: true };
    });
    builder.addCase(createShowtime.fulfilled, (state, action) => {
      return { ...state, isLoading: false, actionSuccess: true, actionResponeAPI: action.payload };
    });
    builder.addCase(createShowtime.rejected, (state, action) => {
      return { ...state, isLoading: false, actionSuccess: false, error: action.error.message };
    });
    // GET USER LIST
    builder.addCase(getUserList.pending, (state) => {
      return { ...state, isLoading: true };
    });
    builder.addCase(getUserList.fulfilled, (state, action) => {
      return { ...state, isLoading: false, userList: action.payload };
    });
    builder.addCase(getUserList.rejected, (state, action) => {
      return { ...state, isLoading: false, error: action.error.message };
    });
    // ADD USER
    builder.addCase(addUser.pending, (state) => {
      return { ...state, isLoading: true };
    });
    builder.addCase(addUser.fulfilled, (state, action) => {
      return { ...state, isLoading: false, actionSuccess: true, actionResponeAPI: action.payload };
    });
    builder.addCase(addUser.rejected, (state, action) => {
      return { ...state, isLoading: false, actionSuccess: false, error: action.error.message };
    });
    // DELETE USER
    builder.addCase(deleteUser.pending, (state) => {
      return { ...state, isLoading: true };
    });
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      return { ...state, isLoading: false, actionSuccess: true, actionResponeAPI: action.payload };
    });
    builder.addCase(deleteUser.rejected, (state, action) => {
      return { ...state, isLoading: false, actionSuccess: false, error: action.error.message };
    });
    // EDIT USER
    builder.addCase(fetchEditUserData.pending, (state) => {
      return { ...state, isLoading: true };
    });
    builder.addCase(fetchEditUserData.fulfilled, (state, action) => {
      return { ...state, isLoading: false, editUserData: action.payload };
    });
    builder.addCase(fetchEditUserData.rejected, (state, action) => {
      return { ...state, isLoading: false, actionSuccess: false, error: action.error.message };
    });
    // UPDATE USER
    builder.addCase(updateUser.pending, (state) => {
      return { ...state, isLoading: true };
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      return { ...state, isLoading: false, actionSuccess: true, actionResponeAPI: action.payload };
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      return { ...state, isLoading: false, actionSuccess: false, error: action.error.message };
    });
  },
});

export const { resetAdminActionStatus, resetAdminReducer } = adminSlice.actions;

export default adminSlice.reducer;
