import React, { useEffect } from "react";
import UserForm from "components/AdminFormItem/UserForm";
import { useDispatch, useSelector } from "react-redux";
import PageLoading from "components/Loading/PageLoading";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  fetchEditUserData,
  resetAdminActionStatus,
} from "redux/slices/adminSlice";
import { notification, Button } from "antd";

const EditUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { editUserData, isLoading, actionSuccess, actionResponeAPI, error } =
    useSelector((state) => state.admin);

  const { accountName } = useParams();

  const location = useLocation();
  // console.log(location);

  useEffect(() => {
    dispatch(fetchEditUserData(accountName));
  }, []);

  useEffect(() => {
    if (actionSuccess && typeof actionResponeAPI === "object") {
      notification["success"]({
        message: "Cập nhật user thành công!",
        duration: 1.5,
      });
      dispatch(resetAdminActionStatus());
      setTimeout(() => {
        navigate("/admin/user-management/user-list", { state: location.state });
      }, 2000);
    }
  }, [actionSuccess, actionResponeAPI]);

  if (isLoading) {
    return <PageLoading classname="h-full" />;
  }

  return (
    <div className="w-full h-full py-5">
      <span className="text-lg p-2 rounded-md bg-orange-300 font-bold">
        Sửa user:
      </span>
      <div className="mt-5">
        <UserForm editUser={editUserData} />
      </div>
      <Button
        type="link"
        onClick={() =>
          navigate("/admin/user-management/user-list", {
            state: location?.state,
          })
        }
      >
        Trở về
      </Button>
    </div>
  );
};

export default EditUser;
