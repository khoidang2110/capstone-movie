import { Button } from "antd";
import PageLoading from "components/Loading/PageLoading";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, NavLink, useLocation, useNavigate, useOutletContext } from "react-router-dom";
import { currencyVNDFormat } from "utils/currencyFormat";
import { resetTicketsReducer } from "redux/slices/ticketsSlice";

const SuccessConfirm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isConfirmLoading } = useSelector((state) => state.tickets);

  const location = useLocation();

  if (!location.state) {
    return <Navigate to="/" replace />;
  }

  const { successTickets } = location.state;

  const handleBackToHome = () => {
    dispatch(resetTicketsReducer());
    navigate("/", { replace: true });
  };

  window.onpopstate = () => {
    dispatch(resetTicketsReducer());
    navigate("/", { replace: true });
  };

  return (
    <div className="container mx-auto text-center px-5 md:px-10 lg:px-40 mt-1">
      {isConfirmLoading && <PageLoading />}
      <p className="font-bold text-red-500">Vui lòng lưu lại thông tin đặt vé này ! Xin cảm ơn</p>

      <div className="px-10 lg:px-40 bg-slate">
        <div className="bg-slate-300 rounded-md">
          <div className="flex justify-between items-center">
            <div>
              <NavLink to="/">
                <Button type="primary" onClick={handleBackToHome}>
                  Back to home
                </Button>
              </NavLink>
            </div>
            <h2 className="text-2xl font-semibold border-b">Thông tin vé</h2>
          </div>
          <div className="flex flex-col md:flex-row w-full">
            <div className="lg:w-1/2">
              <div className="p-3">
                <img src={successTickets.hinhAnh} alt={successTickets.tenPhim} className="h-52 md:h-full" />
              </div>
            </div>
            <div className="lg:w-1/2 text-left px-5">
              <p className="text-xl font-bold p-1 bg-orange-500 rounded-md">{successTickets.tenPhim}</p>
              <p className="text-md font-bold p-1 bg-slate-200">{successTickets.tenCumRap}</p>
              <p className="text-md font-bold p-1 bg-slate-200">{successTickets.diaChi}</p>
              <p className="text-md font-bold p-1 bg-slate-200">{successTickets.tenRap}</p>
              <p className="text-md font-bold p-1 bg-slate-200">{successTickets.ngayChieu}</p>
              <p className="text-md font-bold p-1 bg-slate-200">{successTickets.gioChieu}</p>
              <p className="text-md font-bold p-1 bg-slate-200">
                {currencyVNDFormat.format(successTickets.selectedSeats?.reduce((total, seat) => total + seat.giaVe, 0))}{" "}
                VND
              </p>
              <p className="text-md font-bold p-2 bg-slate-200">
                Ghế:{" "}
                {successTickets.selectedSeats?.map((seat, index) => {
                  return (
                    <span className="p-1 text-lg border rounded-md bg-orange-500 mx-2" key={index}>
                      {seat.tenGhe}
                    </span>
                  );
                })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessConfirm;
