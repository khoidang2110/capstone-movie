import axiosClient from "./axiosClient";

const accountAPI = {
  getAccountInfo: () => {
    return axiosClient.post("QuanLyNguoiDung/ThongTinTaiKhoan");
  },
  updateAccountInfo: (updateInfo) => {
    return axiosClient.put("QuanLyNguoiDung/CapNhatThongTinNguoiDung", updateInfo);
  },

  getAccountRole: () => {
    return axiosClient.get("QuanLyNguoiDung/LayDanhSachLoaiNguoiDung");
  },
};

export default accountAPI;
