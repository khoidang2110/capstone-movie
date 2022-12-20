import React from "react";
import { Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import CardLoading from "components/Loading/CardLoading";

import styles from "./FilmItem.module.css";
import useModalHook from "utils/useModalHook";
import { PlayCircleFilled } from "@ant-design/icons";

const FilmItem = ({ movie, isLoading, modal }) => {
  const navigate = useNavigate();

  if (isLoading) {
    return <CardLoading />;
  }

  return (
    <div
      className={`${styles["card"]} flex flex-col rounded-md justify-between bg-white overflow-hidden min-h-full h-72 sm:h-80 md:h-96 shadow-xl`}
    >
      <div className={`${styles["card-img"]} w-full h-3/5 overflow-hidden`}>
        {/* <div className="h-full w-full"> */}
        <img
          className=" w-full h-full min-h-full"
          src={movie.hinhAnh}
          alt={movie.tenPhim}
          title={`Tới trang chi tiết phim`}
        />
        <PlayCircleFilled
          title="Xem trailer"
          className={`${styles["card-play-trailer"]} absolute z-10 top-1/2 left-1/2 text-3xl sm:text-5xl text-orange-600 hover:scale-125 hover:text-orange-600 transition-all hover:cursor-pointer -translate-x-1/2 -translate-y-1/2`}
          onClick={() => {
            modal.showModal();
            modal.onChangeTrailer(movie.trailer);
          }}
        />
        {/* </div> */}
      </div>
      <div className="card-body flex flex-col text-black grow hover:cursor-pointer">
        <div className="card-heading flex flex-col justify-between p-1 sm:p-2 grow" title="Xem chi tiết">
          <Link to={`/detail/${movie.maPhim}`} className="grow">
            <div className="flex items-center ">
              <span className="p-0.5 m-0 mr-1 text-xs text-white bg-orange-600 rounded-tl-lg rounded-br-lg">
                {movie.maPhim}
              </span>

              <h4 className="text-xs m-0 ml-1 sm:text-sm sm:font-bold text-left sm:text-right text-slate-900 uppercase">
                {movie.tenPhim}
              </h4>
            </div>
            <div className={`${styles.dsrc} truncate text-gray-500 text-sm mt-1 m-0 max-h-10`}>{movie.moTa}</div>
          </Link>
        </div>
        <div className="card-button">
          <Link to={`/detail/${movie.maPhim}`}>
            <Button
              className="bg-orange-600 py-5 rounded-md font-bold flex items-center justify-center hover:text-black border-orange-600 hover:bg-orange-700"
              type="primary"
              block
            >
              Đặt vé
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FilmItem;
