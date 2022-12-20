import React, { useEffect } from "react";
import FilmForm from "components/AdminFormItem/FilmForm";
import { useDispatch, useSelector } from "react-redux";
import { resetAdminActionStatus } from "redux/slices/adminSlice";
import { notification, Button } from "antd";
import { useNavigate } from "react-router-dom";

const AddFilm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { actionSuccess, actionResponeAPI } = useSelector((state) => state.admin);

  useEffect(() => {
    if (actionSuccess && typeof actionResponeAPI === "object") {
      notification["success"]({ message: "Thêm phim thành công!", duration: 1.5 });
      dispatch(resetAdminActionStatus());
      setTimeout(() => {
        navigate("/admin/films/film-list");
      }, 2000);
    }
  }, [actionSuccess, actionResponeAPI]);

  return (
    <div className="w-full h-full py-5">
      <span className="text-lg p-2 rounded-md bg-orange-300 font-bold">Thêm phim:</span>
      <div className="mt-5 px-1 lg:px-0">
        <FilmForm />
      </div>
      <Button type="link" onClick={() => navigate("/admin/films/film-list")}>
        Trở về
      </Button>
    </div>
  );
};

export default AddFilm;
