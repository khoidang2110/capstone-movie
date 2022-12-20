import axiosClient from "./axiosClient";

const authAPI = {
  login: (loginValues) => {
    return axiosClient.post("QuanLyNguoiDung/DangNhap", loginValues);
  },
  register: (registerValues) => {
    return axiosClient.post("/QuanLyNguoiDung/DangKy", registerValues);
  },
};

export default authAPI;
