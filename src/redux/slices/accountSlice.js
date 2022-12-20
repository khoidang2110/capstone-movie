import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import accountAPI from "services/accountAPI";

const initialState = {
  accountInfo: {},
  bookedTickets: [],
  isUpdateSuccess: null,
  isLoading: false,
  error: "",
};

export const getAccountInfo = createAsyncThunk("account/getAccountInfo", async () => {
  try {
    const data = await accountAPI.getAccountInfo();
    return data;
  } catch (error) {
    throw error;
  }
});

export const updateAccountInfo = createAsyncThunk("account/updateAccountInfo", async (updateInfo) => {
  try {
    const data = await accountAPI.updateAccountInfo(updateInfo);
    return data;
  } catch (error) {
    throw error;
  }
});

const accountSlice = createSlice({
  name: "account",
  initialState: initialState,
  reducers: {
    resetUpdateStatus: (state) => {
      return { ...state, isUpdateSuccess: null };
    },
    resetAccountReducer: (state) => {
      return { ...state, accountInfo: {}, bookedTickets: [], isUpdateSuccess: null, isLoading: false, error: "" };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAccountInfo.pending, (state, action) => {
      return { ...state, isLoading: true };
    });
    builder.addCase(getAccountInfo.fulfilled, (state, { payload: { thongTinDatVe, ...rest } }) => {
      return { ...state, isLoading: false, accountInfo: { ...rest }, bookedTickets: [...thongTinDatVe] };
    });
    builder.addCase(getAccountInfo.rejected, (state, action) => {
      return { ...state, isLoading: false, error: action.error.message };
    });
    //

    builder.addCase(updateAccountInfo.pending, (state, action) => {
      return { ...state, isLoading: true };
    });
    builder.addCase(
      updateAccountInfo.fulfilled,
      (state, { payload: { taiKhoan, matKhau, email, hoTen, soDT, maLoaiNguoiDung } }) => {
        return {
          ...state,
          isLoading: false,
          accountInfo: {
            ...state.accountInfo,
            taiKhoan,
            matKhau,
            email,
            hoTen,
            soDT,
            maLoaiNguoiDung:
              maLoaiNguoiDung === "Quản trị" ? "QuanTri" : maLoaiNguoiDung === "Khách hàng" ? "KhachHang" : "",
            loaiNguoiDung: {
              maLoaiNguoiDung:
                maLoaiNguoiDung === "Quản trị" ? "QuanTri" : maLoaiNguoiDung === "Khách hàng" ? "KhachHang" : "",
              tenLoai: maLoaiNguoiDung,
            },
          },
          isUpdateSuccess: true,
        };
      }
    );
    builder.addCase(updateAccountInfo.rejected, (state, action) => {
      return { ...state, isLoading: false, isUpdateSuccess: false, error: action.error.message };
    });
  },
});

export const { resetAccountReducer, resetUpdateStatus } = accountSlice.actions;

export default accountSlice.reducer;
