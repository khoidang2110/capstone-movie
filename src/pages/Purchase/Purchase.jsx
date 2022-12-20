import React, { useEffect, useState } from "react";
import PageLoading from "components/Loading/PageLoading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCouch, faUser, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useParams, useLocation, useNavigate } from "react-router-dom";
import SeatItem from "./SeatItem";
import { currencyVNDFormat } from "utils/currencyFormat";
import { Popconfirm } from "antd";

import {
  resetTicketsReducer,
  ticketsByShowtime,
  bookSelectedTickets,
  loadOtherSelectedSeats,
} from "redux/slices/ticketsSlice";
import { Button, notification } from "antd";
import PopupModal from "components/Modal/PopupModal";
import useModalHook from "utils/useModalHook";
import { connection } from "index";

const Purchase = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let location = useLocation();

  const { showtimeId } = useParams();

  const { visible, showModal, closeModal } = useModalHook();

  const [confirmVisible, setConfirmVisible] = useState(false);

  const [firstLoad, setFirstLoad] = useState(true);

  const { ticketsData, selectedSeats, isPageLoading, isConfirmLoading, bookedSuccess, error } = useSelector((state) => {
    return state.tickets;
  });

  const { currentUser } = useSelector((state) => state.auth);

  let total = selectedSeats?.reduce((total, seat, index) => {
    return total + seat.giaVe;
  }, 0);

  const handleSubmit = () => {
    if (!Object.keys(currentUser).length) {
      showModal();
    } else {
      dispatch(bookSelectedTickets(showtimeId));
    }
  };

  const clearOtherSelectedSeats = () => {
    connection.invoke("huyDat", currentUser.taiKhoan, Number(showtimeId));
  };

  useEffect(() => {
    window.addEventListener("beforeunload", clearOtherSelectedSeats);

    dispatch(ticketsByShowtime(showtimeId));

    connection.on("datVeThanhCong", () => {
      dispatch(ticketsByShowtime(showtimeId));
    });

    connection.invoke("loadDanhSachGhe", Number(showtimeId));

    connection.on("loadDanhSachGheDaDat", (dsGheDangDatReturn) => {
      // GET ANOTHER USER CHOSEN SEATS
      let otherSelected = dsGheDangDatReturn.filter((item) => item.taiKhoan !== currentUser.taiKhoan);

      let otherSelectedSeatsArr = otherSelected.reduce((result, item, index) => {
        return [...result, ...JSON.parse(item.danhSachGhe)];
      }, []);

      // DISPATCH OTHER SELECTED SEATS TO REDUX
      dispatch(loadOtherSelectedSeats(otherSelectedSeatsArr));
    });
    return () => {
      clearOtherSelectedSeats();
      window.removeEventListener("beforeunload", clearOtherSelectedSeats);
      dispatch(resetTicketsReducer());
    };
  }, []);

  useEffect(() => {
    if (bookedSuccess) {
      notification["success"]({ message: "Đặt vé thành công" });
      setTimeout(() => {
        navigate(`/purchase/${showtimeId}/success`, {
          state: {
            from: location.pathname,
            successTickets: { ...ticketsData.thongTinPhim, selectedSeats: selectedSeats },
          },
        });
      }, 1000);
    }

    if (Object.keys(ticketsData).length) {
      if (firstLoad) {
        setFirstLoad(false);
      }
    }

    return () => {
      notification.destroy();
    };
  }, [bookedSuccess, ticketsData]);

  if (firstLoad && isPageLoading) {
    return <PageLoading />;
  }

  return (
    <div className="lg:container mx-auto my-2 w-full">
      <div className="flex flex-col lg:flex-row w-full">
        <div className="w-full lg:w-4/5 lg:mx-2 max-w-full">
          <div className="text-center bg-slate-300 text-black shadow-2xl mb-5 p-2">SCREEN</div>
          <div className="flex gap-3 justify-between">
            <p className="m-1 text-gray-100">16 ghế trên 1 hàng</p>
          </div>
          <div className="overflow-x-scroll mx-2 lg:overflow-hidden">
            <div className="grid grid-cols-16 gap-3 p-2" style={{ minWidth: "800px" }}>
              {ticketsData.danhSachGhe?.map((seat) => {
                return <SeatItem key={seat.maGhe} seat={seat} />;
              })}
            </div>
          </div>
          <div className="grid grid-cols-3 md:flex md:flex-row justify-around bg-slate-500 rounded-md mt-5 shadow-lg w-full max-w-full">
            <div className="text-center text-gray-100">
              <FontAwesomeIcon
                size="xs"
                icon={faCouch}
                className="bg-red-600 px-5 py-2 border text-black border-black my-2 rounded-md"
              />
              <p>Đã có khách đặt</p>
            </div>
            <div className="text-center text-gray-100">
              <FontAwesomeIcon
                size="xs"
                icon={faCouch}
                className="bg-orange-400 px-5 py-2 border text-black border-black my-2 rounded-md"
              />
              <p>Ghế vip</p>
            </div>
            <div className="text-center text-gray-100">
              <FontAwesomeIcon
                size="xs"
                icon={faCouch}
                className="bg-slate-300 px-5 py-2 border text-black border-black my-2 rounded-md"
              />
              <p>Chưa đặt</p>
            </div>
            <div className="text-center text-gray-100">
              <FontAwesomeIcon
                size="xs"
                icon={faCouch}
                className="bg-green-600 px-5 py-2 border text-black border-black my-2 rounded-md"
              />
              <p>Bạn đang chọn</p>
            </div>
            <div className="text-center text-gray-100">
              <FontAwesomeIcon
                size="xs"
                icon={faUser}
                className="bg-blue-600 px-5 py-2 border text-black border-black my-2 rounded-md"
              />
              <p>Khách đang chọn</p>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-1/5 lg:mx-1 mt-3 lg:mt-0">
          <div className="text-center border border-slate-400 shadow-lg bg-white px-2">
            <p className="text-xl border-b font-bold">Thông tin vé</p>
            <p className="text-2xl text-green-500 font-extrabold bg-orange-200 rounded-md">
              {total && currencyVNDFormat.format(total)}
              <span className="mx-2 text-xl">VND</span>
            </p>
            <div className="flex flex-col sm:flex-row lg:flex-col justify-start text-left">
              <img src={ticketsData.thongTinPhim?.hinhAnh} alt="" className="h-72 md:w-full mr-5" />

              <div>
                <div>
                  <p className=" border-slate-600 border-b  font-bold pb-1">
                    Cụm rạp: <span className="text-green-600 text-lg">{ticketsData.thongTinPhim?.tenCumRap}</span>
                  </p>
                  <p className=" border-slate-600 border-b font-bold pb-1">
                    Địa chỉ: <span className="text-green-600 text-md">{ticketsData.thongTinPhim?.diaChi}</span>
                  </p>
                  <p className=" border-slate-600 border-b  font-bold pb-1">
                    Rạp:{" "}
                    <span className="text-green-600 text-lg bg-orange-300 rounded-md p-1">
                      {ticketsData.thongTinPhim?.tenRap}
                    </span>
                  </p>
                </div>
                <div>
                  <p className=" border-slate-600 border-b font-bold pb-1">
                    Ngày giờ chiếu:
                    <span className="text-green-600 text-lg">{ticketsData.thongTinPhim?.ngayChieu}</span> -
                    <span className="text-red-600 text-lg">{ticketsData.thongTinPhim?.gioChieu}</span>
                  </p>
                  <p className=" border-slate-600 border-b font-bold pb-1">
                    Tên phim: <span className="text-green-600 text-lg">{ticketsData.thongTinPhim?.tenPhim}</span>
                  </p>
                  <p className=" border-slate-600 border-b  font-bold pb-1">
                    Ghế chọn:
                    <span className="text-green-600 text-lg">
                      {selectedSeats
                        ?.map((ticket) => {
                          return ticket.tenGhe;
                        })
                        .join(", ")}
                    </span>
                  </p>
                </div>
                <div className="my-3">
                  <Popconfirm
                    title={
                      <p>
                        Xác nhận mua vé{" "}
                        {selectedSeats.length &&
                          selectedSeats.map((seat, index) => (
                            <span key={index} className="font-bold">
                              {seat.tenGhe},
                            </span>
                          ))}
                      </p>
                    }
                    okText="Xác nhận"
                    cancelText="Hủy"
                    visible={Object.keys(currentUser).length && confirmVisible}
                    okButtonProps={{
                      loading: isConfirmLoading,
                    }}
                    onConfirm={handleSubmit}
                    onCancel={() => setConfirmVisible(false)}
                  >
                    <a onClick={(e) => e.preventDefault()}>
                      <Button
                        loading={isConfirmLoading}
                        disabled={!selectedSeats.length || isConfirmLoading}
                        onClick={() => (!Object.keys(currentUser).length ? showModal(true) : setConfirmVisible(true))}
                        size="large"
                        className="bg-orange-600 w-full round-md text-black hover:text-black font-bold border-orange-600 hover:border-orange-500 hover:bg-orange-500 hover:scale-y-125"
                      >
                        Đặt vé
                      </Button>
                    </a>
                  </Popconfirm>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <PopupModal visible={visible} onCancel={closeModal}>
        {
          <div>
            <p className="text-red-500 font-bold text-2xl">Bạn chưa đăng nhập!</p>
            <p>Đăng nhập tài khoản để mua vé. Bạn có muốn đăng nhập không</p>
            <div className="flex justify-center">
              <div className="mx-5">
                <Link to={"/login"} state={{ from: location }}>
                  <Button type="primary" size="large" className="w-32">
                    Đăng nhập
                  </Button>
                </Link>
              </div>
              <div className="mx-5">
                <Button type="danger" size="large" className="w-32" onClick={closeModal}>
                  Hủy
                </Button>
              </div>
            </div>
          </div>
        }
      </PopupModal>
    </div>
  );
};

export default Purchase;
