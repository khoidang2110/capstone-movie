import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Table } from "antd";
import PageLoading from "components/Loading/PageLoading";

import { currencyVNDFormat } from "utils/currencyFormat";
import useChangeWidth from "utils/useChangeWidth";
import { Navigate } from "react-router-dom";

const TicketHistory = () => {
  const { bookedTickets, isLoading } = useSelector((state) => state.account);

  const { width, changeWidth } = useChangeWidth();

  useEffect(() => {
    window.addEventListener("resize", changeWidth);

    return () => {
      window.removeEventListener("resize", changeWidth);
    };
  }, []);

  const columns =
    width === "xs" || width === "sm" || width === "md"
      ? [
          {
            title: "Mã vé",
            key: "maVe",
            dataIndex: "maVe",
            align: "left",
            width: 20,
            render: (_, { maVe }) => <span>{maVe}</span>,
          },
          {
            title: "Thông tin",
            key: "thongTin",
            dataIndex: "thongTin",
            render: (_, { maVe, danhSachGhe, tenPhim, thoiLuongPhim, hinhAnh, giaVe, ngayDat }) => {
              return (
                <div>
                  <div className="flex justify-between">
                    <div className="w-1/2 mr-2">
                      <div>
                        <div className="text-center">
                          <p className="font-bold text-green-500 m-0">
                            {ngayDat.split("T")[0].split("-").reverse().join("/")}
                          </p>
                          <p className="font-bold text-red-500 m-0">
                            {ngayDat.split("T")[1].split("-").reverse().join("-").slice(0, 5)}
                          </p>
                        </div>
                        <div className="sm:h-1/3">
                          <img src={hinhAnh} alt="" className={`h-40 sm:h-60 max-w-full`} />
                          <span className="m-0 mt-1 font-bold bg-orange-300 rounded-md p-1">
                            {tenPhim}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="w-1/2 ml-2">
                      <div className="mb-2">
                        <p className="font-bold bg-slate-300 p-1 rounded-md">
                          {danhSachGhe[0].tenHeThongRap}
                        </p>
                        <span className="font-bold p-1 bg-orange-300 m-0">
                          {danhSachGhe[0].tenRap}
                        </span>
                      </div>
                      <span className="font-bold">Ghế: </span>
                      <div className="border" style={{ maxHeight: "200px", overflowY: "scroll" }}>
                        <p className="font-bold">
                          {danhSachGhe.map((seat) => seat.tenGhe).join(", ")}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p></p>
                  </div>
                </div>
              );
            },
          },
        ]
      : [
          {
            title: "Mã vé",
            key: "maVe",
            dataIndex: "maVe",
            align: "left",
            width: 80,
          },
          {
            title: "Tên phim",
            key: "tenPhim",
            dataIndex: "tenPhim",
            width: 100,
            render: (_, { tenPhim }) => <span className="font-bold">{tenPhim}</span>,
          },
          {
            title: "Ngày đặt",
            key: "ngayDat",
            dataIndex: "ngayDat",
            width: 100,
            render: (_, { ngayDat }) => {
              return (
                <>
                  <p className="font-bold bg-green-300 rounded-md p-1">
                    {ngayDat.split("T")[0].split("-").reverse().join("-")}
                  </p>
                  <p className="p-1 bg-orange-300 rounded-md font-bold m-0">
                    {ngayDat.split("T")[1].split("-").reverse().join("-").slice(0, 5)}
                  </p>
                </>
              );
            },
          },
          {
            title: "Giá vé",
            dataIndex: "giaVe",
            key: "giaVe",
            width: 50,
            render: (_, { giaVe }) => <span>{currencyVNDFormat.format(giaVe)} vnd</span>,
          },
          {
            title: "Thời lượng",
            dataIndex: "thoiLuongPhim",
            key: "thoiLuongPhim",
            width: 50,
            render: (_, { thoiLuongPhim }) => <span>{thoiLuongPhim} phút</span>,
          },
          {
            title: "Hình ảnh",
            dataIndex: "hinhAnh",
            key: "hinhAnh",
            width: 150,
            render: (_, { hinhAnh, tenPhim }) => (
              <img src={hinhAnh} alt={tenPhim} title={tenPhim} />
            ),
          },
          {
            title: "Danh sách ghế (theo hệ thống rạp)",
            dataIndex: "danhSachGhe",
            key: "danhSachGhe",
            render: (_, { danhSachGhe }) => {
              return (
                <div>
                  <div className="bg-slate-400 m-1 rounded-md p-1 flex justify-around items-center text-black">
                    <span className="m-0 text-lg font-bold ">{danhSachGhe[0].maHeThongRap}</span>
                    <span className="m-0 font-semibold">{danhSachGhe[0].tenHeThongRap}</span>
                    <span className="m-0  font-semibold">{danhSachGhe[0].tenCumRap}</span>
                  </div>
                  <div>
                    <p className="m-0 font-bold mx-1">Ghế: </p>
                    <div className="sm:h-60 sm:overflow-y-scroll xl:h-full xl:overflow-auto">
                      {danhSachGhe.map((seat, index) => (
                        <span
                          className="p-1 m-1 text-center md:w-10 rounded-md font-bold inline-block bg-slate-300"
                          key={index}
                        >
                          {seat.tenGhe}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            },
          },
        ];
  if (isLoading) {
    return <PageLoading classname={"min-h-full"} />;
  }

  return (
    <div className="w-full h-full text-gray-100">
      <div className="h-full max-h-full">
        <Table
          size="middle"
          rowKey={"maVe"}
          dataSource={bookedTickets}
          columns={columns}
          bordered
          pagination={{
            position: "bottom",
            pageSize: 5,
            onChange: (value) => {
              console.log(value);
              window.scrollTo({ top: 0, behavior: "smooth" });
            },
          }}
          // scroll={{ scrollToFirstRowOnChange: true, y: 500 }}
        />
      </div>
    </div>
  );
};

export default TicketHistory;
