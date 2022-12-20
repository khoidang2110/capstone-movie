import React, { useState } from "react";
import { Button } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faCouch, faUser, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { getRealtimeTickets, selectSeat } from "redux/slices/ticketsSlice";

const SeatItem = ({ seat }) => {
  const dispatch = useDispatch();

  const { selectedSeats, realtimeTickets } = useSelector((state) => {
    return state.tickets;
  });

  // save selected ticket and bind back to UI when user got redirected to purchase page after logged in
  // const savedSelect = selectedSeats?.find((item) => {
  //   return item.maGhe === seat.maGhe;
  // });

  let isSelectByOther = realtimeTickets.findIndex((rtSeat) => rtSeat.maGhe === seat.maGhe) !== -1 ? true : false;

  // const [isSelected, setIsSelected] = useState(false || savedSelect?.isSelected);
  const [isSelected, setIsSelected] = useState(false);

  const handleSelectTicket = (seat) => {
    const { tenGhe, maGhe, giaVe } = seat;

    setIsSelected(!isSelected);

    dispatch(selectSeat({ tenGhe, maGhe, giaVe, isSelected: !isSelected }));
    dispatch(getRealtimeTickets());
  };

  return (
    <div className="rounded-md overflow-hidden">
      <Button
        title={
          isSelectByOther
            ? "Ghế này đang có khách chọn"
            : seat.daDat
            ? `Vé ${seat.tenGhe} đã được đặt`
            : `Click để đặt ghế ${seat.loaiGhe === "Vip" ? "vip" : "thường"} ${seat.tenGhe}`
        }
        size="large"
        className={`w-full h-full text-center m-0 p-0 text-black rounded-md overflow-hidden border-2 border-slate-900 
          ${(isSelectByOther === false || !seat.daDat) && "hover:border-blue-600"} 
          ${
            isSelectByOther
              ? "bg-blue-600"
              : seat.daDat
              ? "bg-red-600"
              : isSelected
              ? "bg-green-600"
              : seat.loaiGhe === "Vip"
              ? "bg-orange-400"
              : "bg-slate-300"
          }`}
        disabled={isSelectByOther || seat.daDat}
        onClick={() => handleSelectTicket(seat)}
      >
        <div className="w-full flex flex-col pt-1 items-center justify-center">
          <FontAwesomeIcon icon={isSelectByOther ? faUser : faCouch} />
          <p className="m-0 font-bold text-sm" style={{ fontSize: "10px" }}>
            {seat.tenGhe}
          </p>
        </div>
      </Button>
    </div>
  );
};

export default SeatItem;
