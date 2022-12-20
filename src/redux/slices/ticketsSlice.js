import ticketsAPI from "services/ticketsAPI";
import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { connection } from "index";

const initialState = {
  selectedSeats: [],
  isConfirmLoading: false,
  realtimeTickets: [],
  bookedSuccess: "",
  ticketsData: {},
  isPageLoading: false,
  error: "",
};

export const ticketsByShowtime = createAsyncThunk("tickets/ticketsByShowtime", async (showtimeId) => {
  try {
    const data = await ticketsAPI.getTicketsByShowtime(showtimeId);
    return data;
  } catch (error) {
    throw error;
  }
});

export const bookSelectedTickets = createAsyncThunk(
  "ticket/bookSelectedTickets",
  async (showtimeId, { dispatch, getState }) => {
    try {
      const {
        currentUser: { taiKhoan },
      } = getState().auth;

      const {
        selectedSeats,
        ticketsData: {
          thongTinPhim: { maLichChieu },
        },
      } = getState().tickets;
      let filter = selectedSeats.map(({ tenGhe, giaVe, maGhe, isSelected }) => {
        return { maGhe, giaVe };
      });
      const data = await ticketsAPI.sendBookedTickets({ maLichChieu: showtimeId, danhSachVe: [...filter] });

      connection.invoke("datGheThanhCong", taiKhoan, Number(maLichChieu));

      return data;
    } catch (error) {
      throw error;
    }
  }
);

export const getRealtimeTickets = createAsyncThunk("tickets/getRealtimeTickets", async (_, { getState }) => {
  try {
    const {
      currentUser: { taiKhoan },
    } = getState().auth;
    const {
      selectedSeats,
      ticketsData: {
        thongTinPhim: { maLichChieu },
      },
    } = getState().tickets;

    await connection.invoke("datGhe", taiKhoan, JSON.stringify(selectedSeats), Number(maLichChieu));
  } catch (error) {
    throw error;
  }
});

const ticketsSlice = createSlice({
  name: "tickets",
  initialState: initialState,
  reducers: {
    selectSeat: (state, action) => {
      const { maGhe, isSelected } = action.payload;
      if (isSelected) {
        return {
          ...state,
          selectedSeats: [...state.selectedSeats, { ...action.payload, isSelected: isSelected }],
        };
      } else {
        return {
          ...state,
          selectedSeats: [...state.selectedSeats].filter((ticket) => {
            return ticket.maGhe !== maGhe;
          }),
        };
      }
    },
    loadOtherSelectedSeats: (state, action) => {
      return { ...state, realtimeTickets: action.payload };
    },
    resetTicketsReducer: (state) => {
      state.selectedSeats = [];
      state.isConfirmLoading = false;
      state.realtimeTickets = [];
      state.bookedSuccess = "";
      state.ticketsData = {};
      state.isPageLoading = false;
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(ticketsByShowtime.pending, (state, action) => {
      return { ...state, isPageLoading: true };
    });
    builder.addCase(ticketsByShowtime.fulfilled, (state, action) => {
      return { ...state, isPageLoading: false, ticketsData: action.payload };
    });
    builder.addCase(ticketsByShowtime.rejected, (state, action) => {
      return { ...state, isPageLoading: false, error: action.error.message };
    });
    //
    builder.addCase(bookSelectedTickets.pending, (state, action) => {
      return { ...state, isConfirmLoading: true };
    });
    builder.addCase(bookSelectedTickets.fulfilled, (state, action) => {
      return { ...state, isConfirmLoading: false, bookedSuccess: action.payload };
    });
    builder.addCase(bookSelectedTickets.rejected, (state, action) => {
      return { ...state, isConfirmLoading: false, error: action.error.message };
    });
  },
});

export const { selectSeat, resetTicketsReducer, loadOtherSelectedSeats } = ticketsSlice.actions;

export default ticketsSlice.reducer;
