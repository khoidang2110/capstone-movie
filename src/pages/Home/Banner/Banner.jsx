import React, { useState } from "react";
import { Carousel } from "antd";
import { PlayCircleFilled } from "@ant-design/icons";
import { useSelector } from "react-redux";
import styles from "./Banner.module.css";
import PopupModal from "components/Modal/PopupModal";
import useModalHook from "utils/useModalHook";

const Banner = () => {
  const { banners } = useSelector((state) => {
    return state.movies;
  });

  const [code, setCode] = useState("");

  const { visible, closeModal, showModal } = useModalHook();

  return (
    <div className={`${styles["movie-banner"]}`}>
      <Carousel draggable dots arrows autoplay={!visible} autoplaySpeed={3000}>
        {banners.map((carousel) => {
          return (
            <div key={carousel.maBanner}>
              <div className={`${styles["banner-img"]} relative w-full h-full`}>
                <img src={carousel.hinhAnh} alt={carousel.maPhim} className="w-full h-full object-fill" />
                <PlayCircleFilled
                  className={`${styles["banner-play-icon"]} absolute top-1/2 left-1/2 text-4xl md:text-7xl hover:scale-125 hover:text-orange-600 transition-all hover:cursor-pointer -translate-x-1/2 -translate-y-1/2`}
                  onClick={() => {
                    showModal(!visible);
                    setCode(carousel.maBanner);
                  }}
                />
              </div>
            </div>
          );
        })}
      </Carousel>
      <PopupModal
        visible={visible}
        onCancel={closeModal}
        className={"w-5/6 h-1/3 sm:h-2/4 md:h-3/5 lg:h-4/6 xl:h-5/6 2xl:h-5/6"}
        closeIcon={<></>}
        bodyStyle={{ padding: "0px", height: "100%" }}
      >
        {
          <iframe
            src={`https://www.youtube.com/embed/${
              code === 1 ? "uqJ9u7GSaYM" : code === 2 ? "kBY2k3G6LsM" : "NYH2sLid0Zc"
            }`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen={true}
            className="w-full h-full"
          />
        }
      </PopupModal>
    </div>
  );
};

export default Banner;
