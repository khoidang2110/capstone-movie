import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import theaterAPI from "services/theaterAPI";

const initialState = {
  theatersBrandWithShowtime: [],
  showtimesById: {},
  isTheatersLoading: false,
  error: "",
};

export const getTheatersBrandWithShowtime = createAsyncThunk("theaters/getTheatersBrandWithShowtime", async () => {
  try {
    const data = theaterAPI.getTheatersBrandWithShowtime();
    return data;
  } catch (error) {
    throw error;
  }
});

export const getShowtimesByMovieId = createAsyncThunk("theaters/getShowtimesByMovieId", async (movieId) => {
  try {
    const data = await theaterAPI.getShowtimesByMovieId(movieId);
    return data;
  } catch (error) {
    throw error;
  }
});

const theatersSlice = createSlice({
  name: "theaters",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTheatersBrandWithShowtime.pending, (state) => {
      return { ...state, error: "", isTheatersLoading: true };
    });
    builder.addCase(getTheatersBrandWithShowtime.fulfilled, (state, action) => {
      return { ...state, isTheatersLoading: false, theatersBrandWithShowtime: action.payload, error: "" };
    });
    builder.addCase(getTheatersBrandWithShowtime.rejected, (state, action) => {
      return { ...state, isTheatersLoading: false, error: action.error.message };
    });
    //
    builder.addCase(getShowtimesByMovieId.pending, (state) => {
      return { ...state, error: "", isTheatersLoading: true };
    });
    builder.addCase(getShowtimesByMovieId.fulfilled, (state, action) => {
      return { ...state, isTheatersLoading: false, showtimesById: action.payload };
    });
    builder.addCase(getShowtimesByMovieId.rejected, (state, action) => {
      return { ...state, isTheatersLoading: false, error: action.error.message };
    });
  },
});

export default theatersSlice.reducer;
