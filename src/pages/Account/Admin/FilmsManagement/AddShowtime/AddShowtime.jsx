import React, { useEffect } from "react";
import { notification, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ShowtimeForm from "components/AdminFormItem/ShowtimeForm";
import { resetAdminActionStatus } from "redux/slices/adminSlice";

const AddShowtime = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { actionSuccess, actionResponeAPI, error } = useSelector((state) => state.admin);

  useEffect(() => {
    if (actionSuccess && typeof actionResponeAPI === "string") {
      notification["success"]({ message: "Thêm lịch chiếu phim thành công!", duration: 1.5 });
      dispatch(resetAdminActionStatus());
    } else if (!actionSuccess && error) {
      notification["error"]({ message: "Thêm lịch chiếu phim không thành công thành công!", description: error });
      dispatch(resetAdminActionStatus());
    }
  }, [actionSuccess, actionResponeAPI]);

  return (
    <div className="w-full h-full py-5">
      <span className="text-lg p-2 rounded-md bg-orange-300 font-bold">Thêm lịch chiếu:</span>
      <div className="mt-5">
        <ShowtimeForm />
      </div>
      <Button type="link" onClick={() => navigate("/admin/films/film-list")}>
        Trở về
      </Button>
    </div>
  );
};

export default AddShowtime;
