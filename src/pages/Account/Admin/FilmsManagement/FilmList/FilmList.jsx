import React, { useEffect, useState } from "react";
import { notification, Table, Input, Button } from "antd";
import { EditFilled, DeleteFilled, SettingFilled, DiffFilled } from "@ant-design/icons";
import PageLoading from "components/Loading/PageLoading";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getMovieList, deleteMovie, resetAdminActionStatus } from "redux/slices/adminSlice";
import useChangeWidth from "utils/useChangeWidth";
import PopupModal from "components/Modal/PopupModal";
import useModalHook from "utils/useModalHook";

const FilmList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { movieList, isLoading, actionSuccess, actionResponeAPI, error } = useSelector((state) => state.admin);

  const [keyword, setKeyword] = useState("");

  const location = useLocation();

  const [currentPage, setCurrentPage] = useState(location?.state ?? 1);

  const { width, changeWidth } = useChangeWidth();

  const { visible, showModal, closeModal } = useModalHook();

  const handleSearch = (value) => {
    if (value) {
      dispatch(getMovieList(value));
    } else {
      dispatch(getMovieList());
    }
  };

  useEffect(() => {
    dispatch(getMovieList());

    window.addEventListener("resize", changeWidth);

    return () => {
      window.removeEventListener("resize", changeWidth);
    };
  }, []);

  useEffect(() => {
    if (actionSuccess && typeof actionResponeAPI === "string") {
      notification["info"]({ message: "Xóa phim thành công", duration: 2 });
      dispatch(resetAdminActionStatus());
      dispatch(getMovieList());
    }
  }, [actionSuccess, actionResponeAPI]);

  const columns =
    width === "xs" || width === "sm"
      ? [
          {
            title: "MP",
            key: "maPhim",
            dataIndex: "maPhim",
            align: "left",
            width: 50,
          },
          {
            title: "Chi tiết",
            key: "chiTiet",
            dataIndex: "chiTiet",
            align: "left",
            render: (_, { tenPhim, trailer, moTa, ngayKhoiChieu, hinhAnh }) => (
              <div className="font-bold">
                <p className="p-1 bg-orange-300 rounded-md">{tenPhim}</p>
                <p>
                  <span className="font-bold bg-orange-300 rounded-md p-1">
                    {ngayKhoiChieu.split("T")[0].split("-").reverse().join("-")}
                  </span>
                  -
                  <span className="p-1 bg-orange-300 rounded-md font-bold m-0">
                    {ngayKhoiChieu.split("T")[1].slice(0, 5)}
                  </span>
                </p>
                <span>
                  Trailer:{" "}
                  <a href={trailer} target="blank">
                    {trailer}
                  </a>
                </span>

                <p className="truncate">Mô tả: {moTa}</p>
              </div>
            ),
          },
          {
            title: <SettingFilled title="Setting" />,
            dataIndex: "actions",
            key: "actions",
            align: "center",
            width: 30,
            render: (_, { maPhim }) => {
              return (
                <div className="justify-between flex flex-col items-center">
                  <EditFilled
                    title="Sửa phim"
                    className="text-lg hover:scale-125 transition-all hover:text-blue-500 hover:cursor-pointer mx-1 my-3 md:my-0"
                    onClick={() =>
                      navigate(`/admin/films/edit-film/${maPhim}`, {
                        state: currentPage,
                      })
                    }
                  />
                  <DeleteFilled
                    className="text-lg hover:scale-125 transition-all hover:text-red-500 hover:cursor-pointer mx-1 my-3 md:my-0"
                    title="Xóa phim"
                    onClick={() => dispatch(deleteMovie(maPhim))}
                  />
                  <DiffFilled
                    title="Thêm lịch chiếu"
                    className="text-lg hover:scale-125 transition-all hover:text-green-500 hover:cursor-pointer mx-1 my-3 md:my-0"
                    onClick={() => navigate(`/admin/films/add-showtime/${maPhim}`)}
                  />
                </div>
              );
            },
          },
        ]
      : [
          {
            title: "Mã Phim",
            key: "maPhim",
            dataIndex: "maPhim",
            align: "left",
            width: 60,
          },
          {
            title: "Tên phim",
            key: "tenPhim",
            dataIndex: "tenPhim",
            align: "left",
            width: 150,
            render: (tenPhim) => <span className="font-bold">{tenPhim}</span>,
          },
          {
            title: "Hình ảnh & Ngày khởi chiếu",
            dataIndex: "hinhAnh",
            align: "left",
            key: "hinhAnh",
            width: 200,
            render: (_, { tenPhim, hinhAnh, ngayKhoiChieu }) => (
              <div>
                <img src={hinhAnh} alt={tenPhim} title={tenPhim} width={150} />
                <div className="text-left mt-2">
                  <span className="font-bold bg-orange-300 rounded-md p-1">
                    {ngayKhoiChieu.split("T")[0].split("-").reverse().join("-")}
                  </span>
                  <span>-</span>
                  <span className="p-1 bg-orange-300 rounded-md font-bold m-0">
                    {ngayKhoiChieu.split("T")[1].slice(0, 5)}
                  </span>
                </div>
              </div>
            ),
          },
          {
            title: "Đánh giá",
            dataIndex: "danhGia",
            align: "left",
            key: "danhGia",
            width: 55,
            render: (_, { danhGia }) => <span>{danhGia}</span>,
          },
          {
            title: "Mô tả",
            dataIndex: "moTa",
            align: "left",
            key: "moTa",
            render: (_, { moTa }) => (
              <div className="w-full">
                <p className="max-w-full">{moTa}</p>
              </div>
            ),
          },
          {
            title: <SettingFilled title="Setting" />,
            dataIndex: "actions",
            key: "actions",
            align: "center",
            width: 100,
            render: (_, { maPhim }) => {
              return (
                <div className="justify-between flex items-center">
                  <EditFilled
                    title="Sửa phim"
                    className="text-lg hover:scale-125 transition-all hover:text-blue-500 hover:cursor-pointer mx-1"
                    onClick={() =>
                      navigate(`/admin/films/edit-film/${maPhim}`, {
                        state: currentPage,
                      })
                    }
                  />
                  <DeleteFilled
                    className="text-lg hover:scale-125 transition-all hover:text-red-500 hover:cursor-pointer mx-1"
                    title="Xóa phim"
                    onClick={() => dispatch(deleteMovie(maPhim))}
                  />
                  <DiffFilled
                    title="Thêm lịch chiếu"
                    className="text-lg hover:scale-125 transition-all hover:text-green-500 hover:cursor-pointer mx-1"
                    onClick={() => navigate(`/admin/films/add-showtime/${maPhim}`)}
                  />
                </div>
              );
            },
          },
        ];
  if (isLoading) {
    return <PageLoading classname={"min-h-full"} />;
  }

  // console.log(location);

  return (
    <div className="w-full h-full pr-3 md:pr-0 text-gray-100">
      <div className="h-full max-h-full">
        <div className="my-3 text-black flex justify-end">
          <Input.Search
            placeholder="Tìm kiếm phim"
            allowClear={true}
            value={keyword}
            style={width === "lg" || width === "xl" || width === "2xl" ? { width: "50%" } : { width: "100%" }}
            onPressEnter={(e) => handleSearch(e.target.value)}
            enterButton
            onChange={(e) => setKeyword(e.target.value)}
            onSearch={handleSearch}
          />
        </div>
        <Table
          tableLayout="fixed"
          size="middle"
          rowKey={"maPhim"}
          columns={columns}
          dataSource={movieList}
          bordered
          pagination={{
            current: currentPage,
            position: "bottom",
            hideOnSinglePage: true,
            defaultPageSize: 5,
            showSizeChanger: false,
            showQuickJumper: true,
            onChange: (page) => {
              setCurrentPage(page);
              window.scrollTo({ top: 0, behavior: "smooth" });
            },
          }}
        />
      </div>
    </div>
  );
};

export default FilmList;
