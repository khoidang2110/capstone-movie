import React from "react";
import { Button, Carousel } from "antd";
import { Link, NavLink } from "react-router-dom";
import styles from "./AppInfo.module.css";

export const appRef = React.createRef();

const AppInfo = () => {
  return (
    <div className={`lg:block text-center mt-5 ${styles["app-info"]}`} ref={appRef}>
      <div className="flex w-full h-full justify-center items-center">
        <div className="lg:w-2/3 lg:h-4/5">
          <div className="flex w-full h-full justify-center items-center">
            <div className="lg:w-1/2 h-full py-5 lg:py-0 px-10 text-left flex justify-center items-center">
              <div>
                <h1 className="text-white tracking-wider leading-relaxed lg:text-3xl font-bold">
                  Ứng dụng tiện lợi dành cho người yêu điện ảnh
                </h1>
                <p className="text-white lg:text-lg leading-relaxed">
                  Không chỉ đặt vé, bạn còn có thể bình luận phim, chấm điểm rạp và đổi quà hấp dẫn.
                </p>
                <Button
                  size={window.innerWidth > 1024 ? "large" : "small"}
                  className="uppercase px-3 py-5 lg:py-8 lg:px-6 flex items-center justify-center rounded-lg border-orange-700 bg-orange-700 hover:bg-orange-800 hover:border-orange-800 text-white font-bold tracking-wide mb-5"
                >
                  APP Miễn Phí - Tải về ngay
                </Button>
                <p className="text-white text-lg leading-relaxed m-0">
                  TIX có hai phiên bản{" "}
                  <a href="https://play.google.com/store/apps" target={"_blank"} className="text-orange-500 underline">
                    IOS
                  </a>{" "}
                  &{" "}
                  <a href="https://www.apple.com/vn/app-store/" target={"_blank"} className="text-orange-500 underline">
                    Android
                  </a>
                </p>
              </div>
            </div>

            {/*  */}
            <div className="hidden lg:block w-1/2 h-full px-20">
              <div className="h-full flex">
                <div className={`relative z-30 p-2 h-full ${styles["phone-frame"]}`}>
                  <div className="rounded-3xl overflow-hidden h-full">
                    <img src="/img/banner-slider-3.33a486d1.jpg" className="h-full w-full" alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppInfo;
