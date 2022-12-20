import axiosClient, { GROUPID } from "./axiosClient";

const adminAPI = {
  getMovieList: (keyword = "") => {
    if (keyword !== "") {
      return axiosClient.get("QuanLyPhim/LayDanhSachPhim", { params: { maNhom: GROUPID, tenPhim: keyword } });
    }
    return axiosClient.get("QuanLyPhim/LayDanhSachPhim", { params: { maNhom: GROUPID } });
  },

  addMovie: (FormData) => {
    return axiosClient.post("QuanLyPhim/ThemPhimUploadHinh", FormData);
  },

  fecthEditMovieData: (movieId) => {
    return axiosClient.get("QuanLyPhim/LayThongTinPhim", { params: { maPhim: movieId } });
  },

  updateMovie: (FormData) => {
    return axiosClient.post("QuanLyPhim/CapNhatPhimUpload", FormData);
  },

  deleteMovie: (movieId) => {
    return axiosClient.delete("QuanLyPhim/XoaPhim", { params: { maPhim: movieId } });
  },

  getUserList: (keyword = "") => {
    if (keyword !== "") {
      return axiosClient.get("QuanLyNguoiDung/LayDanhSachNguoiDung", { params: { maNhom: GROUPID, tuKhoa: keyword } });
    }
    return axiosClient.get("QuanLyNguoiDung/LayDanhSachNguoiDung", { params: { maNhom: GROUPID } });
  },

  addUser: (values) => {
    return axiosClient.post("QuanLyNguoiDung/ThemNguoiDung", values);
  },

  fecthEditUserData: (account) => {
    return axiosClient.post("QuanLyNguoiDung/LayThongTinNguoiDung", null, { params: { taiKhoan: account } });
  },

  deleteUser: (account) => {
    return axiosClient.delete("QuanLyNguoiDung/XoaNguoiDung", { params: { taiKhoan: account } });
  },

  updateUser: (values) => {
    return axiosClient.post("QuanLyNguoiDung/CapNhatThongTinNguoiDung", values);
  },
};

export default adminAPI;
