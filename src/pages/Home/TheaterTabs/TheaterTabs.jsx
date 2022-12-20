import React from "react";
import { Tabs } from "antd";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const theatersRef = React.createRef();

const TheaterTabs = () => {
  const navigate = useNavigate();

  const { theatersBrandWithShowtime } = useSelector((state) => {
    return state.theaters;
  });

  return (
    theatersBrandWithShowtime && (
      <div
        className={`hidden lg:block container mx-auto text-center px-5 md:px-10 lg:px-20 xl:px-40 py-10 `}
        ref={theatersRef}
      >
        <div className={`border border-slate-300 bg-white`}>
          <Tabs tabPosition="left" tabBarStyle={{ height: "500px", overflow: "hidden" }}>
            {theatersBrandWithShowtime.map((brand) => {
              return (
                <Tabs.TabPane
                  className="p-0"
                  tab={
                    <div className="brand-img">
                      <img
                        width={40}
                        height={40}
                        src={brand.logo}
                        alt={brand.tenHeThongRap}
                        title={brand.tenHeThongRap}
                      />
                    </div>
                  }
                  key={brand.maHeThongRap}
                >
                  <Tabs
                    tabPosition="left"
                    tabBarStyle={{
                      maxHeight: "500px",
                      width: "400px",
                      overflowX: "hidden",
                      overflowY: "scroll",
                      msOverflowStyle: "none",
                    }}
                  >
                    {brand.lstCumRap.map((theater, index) => {
                      return (
                        <Tabs.TabPane
                          key={index}
                          tab={
                            <div className="px-2 text-left transition-colors border-b border-slate-500 active:bg-slate-400">
                              <div className="" title={theater.diaChi}>
                                <h4 className="text-green-600 text-lg font-bold">{theater.tenCumRap}</h4>
                                <p className=" text-gray-500 font-bold text-sm whitespace-normal">{theater.diaChi}</p>
                              </div>
                            </div>
                          }
                        >
                          <div
                            className="flex flex-col"
                            style={{
                              height: "500px",
                              overflowY: "scroll",
                              overflowX: "hidden",
                            }}
                          >
                            {theater.danhSachPhim.map((film) => {
                              return (
                                <div key={film.maPhim} className="py-2 px-5 flex border border-gray-300 h-60 max-h-60">
                                  <div className="mr-4 h-full">
                                    <img
                                      width={200}
                                      src={film.hinhAnh}
                                      alt={film.tenPhim}
                                      className="h-full object-cover"
                                    />
                                  </div>
                                  <div className="flex flex-col h-full w-full">
                                    <div className="mb-2">
                                      <h2 className="text-lg">{film.tenPhim}</h2>
                                    </div>
                                    <div className="overflow-y-scroll grid grid-cols-2">
                                      {film.lstLichChieuTheoPhim.map((showtime) => {
                                        return (
                                          <div
                                            className="bg-slate-300 m-2 py-2 rounded-md transition-colors hover:bg-orange-600 hover:cursor-pointer"
                                            key={showtime.maLichChieu}
                                            onClick={() => {
                                              navigate(`/purchase/${showtime.maLichChieu}`);
                                            }}
                                          >
                                            <span className="bg-orange-600 font-bold p-1 rounded-sm mb-1">
                                              {showtime.tenRap}
                                            </span>

                                            <div className="text-bold hover:text-white">
                                              <p className="m-0">
                                                Ngày:{" "}
                                                {[...showtime.ngayChieuGioChieu.split("T")[0].split("-")]
                                                  .reverse()
                                                  .join("-")}
                                              </p>
                                              <p className="m-0">
                                                Giờ: {showtime.ngayChieuGioChieu.split("T")[1].slice(0, 5)}
                                              </p>
                                            </div>
                                          </div>
                                        );
                                      })}
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </Tabs.TabPane>
                      );
                    })}
                  </Tabs>
                </Tabs.TabPane>
              );
            })}
          </Tabs>
        </div>
      </div>
    )
  );
};

export default TheaterTabs;
