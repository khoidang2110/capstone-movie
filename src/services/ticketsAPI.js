import axiosClient from "./axiosClient";

const ticketsAPI = {
  getTicketsByShowtime: (showtimeId) => {
    return axiosClient.get("QuanLyDatVe/LayDanhSachPhongVe", { params: { MaLichChieu: showtimeId } });
  },
  sendBookedTickets: (ticketsInfo) => {
    return axiosClient.post("QuanLyDatVe/DatVe", ticketsInfo);
  },
  createShowtime: (showtime) => {
    return axiosClient.post("QuanLyDatVe/TaoLichChieu", showtime);
  },
};

export default ticketsAPI;
