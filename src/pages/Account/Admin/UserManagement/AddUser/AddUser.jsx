import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { notification } from "antd";
import UserForm from "components/AdminFormItem/UserForm";
import { resetAdminActionStatus } from "redux/slices/adminSlice";

const AddUser = () => {
  const dispatch = useDispatch();
  const { actionSuccess, actionResponeAPI, error } = useSelector((state) => state.admin);

  useEffect(() => {
    if (actionSuccess && typeof actionResponeAPI === "object") {
      notification["success"]({ message: "Thêm user thành công!", duration: 1.5 });
      dispatch(resetAdminActionStatus());
    } else if (!actionSuccess && error) {
      notification["error"]({ message: "Thêm user không thành công thành công!", description: error });
      dispatch(resetAdminActionStatus());
    }
  }, [actionSuccess, actionResponeAPI]);

  return (
    <div className="w-full h-full py-5">
      <span className="text-lg p-2 rounded-md bg-orange-300 font-bold">Thêm user:</span>
      <div className="mt-5">
        <UserForm />
      </div>
    </div>
  );
};

export default AddUser;
