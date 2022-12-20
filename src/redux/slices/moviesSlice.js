import movieAPI from "services/movieAPI";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  isLoading: false,
  banners: [],
  isBannersLoading: false,
  movieDetail: {},
  isDetailLoading: false,
  moviesPagination: {},
  isMoviesLoading: false,
  error: "",
};

export const getMovieList = createAsyncThunk("movies/getMovieList", async () => {
  try {
    const data = await movieAPI.getMovieList();
    return data;
  } catch (error) {
    throw error;
  }
});

export const getMovieListPagination = createAsyncThunk(
  "movies/getMovieListPagination",
  async ({ page = 1, keyword = undefined }) => {
    try {
      const data = await movieAPI.getMovieListPagination(page, keyword);
      return data;
    } catch (error) {
      throw error;
    }
  }
);

export const getMovieById = createAsyncThunk("movies/getMovieById", async (movieId) => {
  try {
    const data = await movieAPI.getMovieById(movieId);
    return data;
  } catch (error) {
    throw error;
  }
});

export const getMovieBanner = createAsyncThunk("movies/getMovieBanner", async () => {
  try {
    const data = await movieAPI.getMovieBanner();
    return data;
  } catch (error) {
    throw error;
  }
});

export const getMovieDetail = createAsyncThunk("movies/getMovieDetail", async (movieId) => {
  try {
    const data = await movieAPI.getMovieDetail(movieId);
    return data;
  } catch (error) {
    throw error;
  }
});

const moviesSlice = createSlice({
  name: "movies",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMovieList.pending, (state) => {
      return { ...state, isLoading: true, error: "" };
    });
    builder.addCase(getMovieList.fulfilled, (state, action) => {
      return { ...state, error: "", isLoading: false, data: action.payload };
    });
    builder.addCase(getMovieList.rejected, (state, action) => {
      return { ...state, isLoading: false, error: action.error.message };
    });

    builder.addCase(getMovieBanner.pending, (state) => {
      return { ...state, isBannersLoading: true, error: "" };
    });
    builder.addCase(getMovieBanner.fulfilled, (state, action) => {
      return { ...state, error: "", isBannersLoading: false, banners: action.payload };
    });
    builder.addCase(getMovieBanner.rejected, (state, action) => {
      return { ...state, isBannersLoading: false, error: action.error.message };
    });

    builder.addCase(getMovieListPagination.pending, (state) => {
      return { ...state, isMoviesLoading: true };
    });
    builder.addCase(getMovieListPagination.fulfilled, (state, action) => {
      return { ...state, error: "", isMoviesLoading: false, moviesPagination: action.payload };
    });
    builder.addCase(getMovieListPagination.rejected, (state, action) => {
      return { ...state, isMoviesLoading: false, error: action.error.message };
    });

    builder.addCase(getMovieDetail.pending, (state) => {
      return { ...state, isDetailLoading: true };
    });
    builder.addCase(getMovieDetail.fulfilled, (state, action) => {
      return { ...state, error: "", isDetailLoading: false, movieDetail: action.payload };
    });
    builder.addCase(getMovieDetail.rejected, (state, action) => {
      return { ...state, isDetailLoading: false, error: action.error.message };
    });
  },
});

export default moviesSlice.reducer;
