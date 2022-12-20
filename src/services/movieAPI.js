import axiosClient, { GROUPID } from "./axiosClient";

const movieAPI = {
  getMovieList: () => {
    return axiosClient.get("QuanLyPhim/LayDanhSachPhim", { params: { maNhom: GROUPID } });
  },

  getMovieListPagination: (page = 1, keyword = undefined) => {
    if (keyword !== undefined) {
      return axiosClient.get("QuanLyPhim/LayDanhSachPhimPhanTrang", {
        params: {
          maNhom: GROUPID,
          tenPhim: keyword,
        },
      });
    }
    return axiosClient.get("QuanLyPhim/LayDanhSachPhimPhanTrang", {
      params: {
        maNhom: GROUPID,
        soTrang: page,
        soPhanTuTrenTrang: 8,
      },
    });
  },

  getMovieBanner: () => {
    return axiosClient.get("QuanLyPhim/LayDanhSachBanner");
  },

  getMovieById: (movieId) => {
    return axiosClient.get(`QuanLyPhim/LayThongTinPhim/`, {
      params: {
        maPhim: movieId,
      },
    });
  },

  getMovieDetail: (movieId) => {
    return axiosClient.get("QuanLyPhim/LayThongTinPhim", {
      params: {
        maPhim: movieId,
      },
    });
  },
};

export default movieAPI;
