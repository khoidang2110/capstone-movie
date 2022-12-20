import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
  FormOutlined,
  CloseSquareOutlined,
} from "@ant-design/icons";
import { Button, Input, Form, Checkbox, notification, Select } from "antd";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import {
  updateAccountInfo,
  resetAccountReducer,
  resetUpdateStatus,
} from "redux/slices/accountSlice";
import { logout } from "redux/slices/authSlice";
import { GROUPID } from "services/axiosClient";
import { useNavigate } from "react-router-dom";
import useModalHook from "utils/useModalHook";
import PopupModal from "components/Modal/PopupModal";
import accountAPI from "services/accountAPI";
import useChangeWidth from "utils/useChangeWidth";

const AccountProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [hideEdit, setHideEdit] = useState(true);
  const [disableButton, setDisableButton] = useState(false);
  const { accountInfo, isUpdateSuccess } = useSelector(
    (state) => state.account
  );
  const { visible, showModal, closeModal } = useModalHook();

  const [roleState, setRoleState] = useState([]);

  const { getAccountRole } = accountAPI;

  useEffect(() => {
    if (Object.keys(accountInfo).length) {
      const fetchRole = async () => {
        try {
          const data = await getAccountRole();
          setRoleState([...data]);
        } catch (error) {}
      };
      fetchRole();
    }
  }, [accountInfo]);

  const handleHideEdit = () => {
    setHideEdit(!hideEdit);
    reset({ keepDefaultValues: true });
    setDisableButton(false);
  };

  const editInfoSchema = yup.object().shape({
    taiKhoan: yup
      .string()
      .required("Tài khoản không được trống!")
      .matches(accountInfo.taiKhoan)
      .default(accountInfo.taiKhoan),
    matKhau: yup
      .string()
      .required("Mật khẩu không được trống!")
      .default(accountInfo.matKhau)
      .min(6, "Mật khẩu ít nhất 6 ký tự")
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{6,}$/,
        "Mật khẩu yếu!"
      ),
    email: yup
      .string()
      .email("Email không đúng định dạng")
      .required("Email không được trống!")
      .default(accountInfo.email),
    soDT: yup
      .string()
      .required("Số DT không được trống!")
      .matches(/^[0-9]+$/, "Số DT không đúng định dạng")
      .default(accountInfo.soDT),
    hoTen: yup
      .string()
      .required("Họ tên không được trống!")
      .matches(
        "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
          "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
          "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$",
        "Tên chỉ gồm ký tự từ a->z"
      )
      .default(accountInfo.hoTen),
    maLoaiNguoiDung: yup
      .string()
      .required("Chọn loại người dùng")
      .default(accountInfo.maLoaiNguoiDung),
    maNhom: yup.string().required().default(GROUPID),
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(editInfoSchema),
    defaultValues: {
      taiKhoan: accountInfo.taiKhoan,
      matKhau: accountInfo.matKhau,
      email: accountInfo.email,
      soDT: accountInfo.soDt,
      hoTen: accountInfo.hoTen,
      maLoaiNguoiDung: accountInfo.maLoaiNguoiDung,
    },
  });

  const onSubmit = ({ keepDefaultValues, ...restValues }) => {
    dispatch(updateAccountInfo({ ...restValues, maNhom: GROUPID }));
    reset();
  };

  const onError = () => {
    setDisableButton(true);
  };

  useEffect(() => {
    if (isValid) {
      setDisableButton(false);
    }
  }, [isValid]);

  useEffect(() => {
    if (isUpdateSuccess === true) {
      notification["success"]({
        message: "Cập nhật thông tin thành công",
        duration: 1.5,
      });
      dispatch(resetUpdateStatus());
    } else if (isUpdateSuccess === false) {
      notification["error"]({
        message: "Cập nhật thông tin không thành công",
        duration: 1.5,
      });
      dispatch(resetUpdateStatus());
    }
  }, [isUpdateSuccess]);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("user"))) {
      const { maLoaiNguoiDung } = JSON.parse(localStorage.getItem("user"));

      if (accountInfo.maLoaiNguoiDung !== maLoaiNguoiDung) {
        showModal(true);
      }
    }
  }, [accountInfo.maLoaiNguoiDung]);

  return (
    <>
      <div className="w-full lg:p-8 h-full bg-slate-300 text-gray-900">
        <div className="flex">
          <div className="hidden lg:w-1/6 h-40 mr-5">
            <img
              src=""
              alt="avtar-profile"
              className="object-cover object-center w-full h-full"
            />
          </div>
          {hideEdit ? (
            <div className="flex flex-col lg:flex-row ml-5 w-full">
              <div className="flex flex-col sm:w-1/2 w-full mx-1">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">
                    {accountInfo?.hoTen}
                  </h2>
                  <span className="text-md font-bold text-gray-900 bg-orange-500 p-1 rounded-md">
                    {accountInfo?.loaiNguoiDung?.tenLoai}
                  </span>
                </div>
                <div>
                  <div className="mt-5">
                    <div className="flex items-center mb-2">
                      <span className="mx-1">
                        <MailOutlined />
                      </span>
                      <span className="mx-1">{accountInfo?.email}</span>
                    </div>
                    <div className="flex items-center mb-2">
                      <span className="mx-1">
                        <PhoneOutlined />
                      </span>
                      <span className="mx-1">{accountInfo?.soDT}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:w-1/2 mx-1">
                <div className="flex items-center">
                  <p className="font-bold m-0">Tài khoản:</p>
                  <Input
                    readOnly={true}
                    type="text"
                    value={accountInfo.taiKhoan}
                    className="py-1 border rounded-md font-bold w-full md:w-1/2"
                  />
                </div>
                <div className="flex items-center">
                  <p className="font-bold m-0">Mật khẩu:</p>
                  <Input.Password
                    readOnly={true}
                    type="password"
                    value={accountInfo.matKhau}
                    className="py-1 px-5 border rounded-md font-bold w-full md:w-1/2"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row ml-5 w-full">
              <div className="w-full">
                <Form
                  autoComplete="off"
                  onFinish={handleSubmit(onSubmit, onError)}
                  layout="vertical"
                >
                  <div className="flex flex-col lg:flex-row">
                    <div className="lg:w-1/2 px-5">
                      <Form.Item
                        label="Tài khoản"
                        required
                        hasFeedback
                        validateStatus={errors.taiKhoan ? "error" : ""}
                        help={errors.taiKhoan?.message}
                      >
                        <Controller
                          control={control}
                          name="taiKhoan"
                          defaultValue={accountInfo.taiKhoan}
                          render={({ field }) => (
                            <Input
                              {...field}
                              readOnly
                              disabled
                              title="Tài khoản không được thay đổi"
                              className=" px-3 borderrounded-md"
                              placeholder="Nhập tài khoản"
                            />
                          )}
                        />
                      </Form.Item>
                      <Form.Item
                        label="Mật khẩu"
                        required
                        hasFeedback
                        validateStatus={errors.matKhau ? "error" : ""}
                        help={errors.matKhau?.message}
                      >
                        <Controller
                          control={control}
                          name="matKhau"
                          defaultValue={accountInfo.matKhau}
                          render={({ field }) => (
                            <Input.Password
                              {...field}
                              className=" px-3 borderrounded-md"
                              placeholder="Nhập mật khẩu mới"
                            />
                          )}
                        />
                      </Form.Item>
                      <Form.Item
                        label="Email"
                        required
                        hasFeedback
                        validateStatus={errors.email ? "error" : ""}
                        help={errors.email?.message}
                      >
                        <Controller
                          control={control}
                          name="email"
                          defaultValue={accountInfo.email}
                          render={({ field }) => (
                            <Input
                              {...field}
                              className=" px-3 borderrounded-md"
                              placeholder="Nhập email"
                            />
                          )}
                        />
                      </Form.Item>
                    </div>
                    <div className="lg:w-1/2 px-5">
                      <Form.Item
                        label="Số ĐT"
                        required
                        hasFeedback
                        validateStatus={errors.soDT ? "error" : ""}
                        help={errors.soDT?.message}
                      >
                        <Controller
                          control={control}
                          name="soDT"
                          defaultValue={accountInfo.soDT}
                          render={({ field }) => (
                            <Input
                              {...field}
                              className=" px-3 borderrounded-md"
                              placeholder="Nhập số ĐT"
                            />
                          )}
                        />
                      </Form.Item>
                      <Form.Item
                        label="Họ tên"
                        required
                        hasFeedback
                        validateStatus={errors.hoTen ? "error" : ""}
                        help={errors.hoTen?.message}
                      >
                        <Controller
                          control={control}
                          name="hoTen"
                          defaultValue={accountInfo.hoTen}
                          render={({ field }) => (
                            <Input
                              {...field}
                              className=" px-3 borderrounded-md"
                              placeholder="Nhập họ tên"
                            />
                          )}
                        />
                      </Form.Item>
                      <Form.Item
                        label="Loại người dùng"
                        required
                        hasFeedback
                        validateStatus={errors.maLoaiNguoiDung ? "error" : ""}
                        help={errors.maLoaiNguoiDung?.message}
                      >
                        <Controller
                          control={control}
                          name="maLoaiNguoiDung"
                          defaultValue={accountInfo.maLoaiNguoiDung}
                          render={({ field }) => (
                            <Select
                              defaultValue={accountInfo.maLoaiNguoiDung}
                              {...field}
                              placeholder="Loại người dùng"
                            >
                              {roleState.length && (
                                <>
                                  <Select.Option
                                    value={roleState[0].maLoaiNguoiDung}
                                  >
                                    {roleState[0].tenLoai}
                                  </Select.Option>
                                  <Select.Option
                                    value={roleState[1].maLoaiNguoiDung}
                                    disabled={
                                      accountInfo.maLoaiNguoiDung !== "QuanTri"
                                    }
                                  >
                                    {roleState[1].tenLoai}
                                  </Select.Option>
                                </>
                              )}
                            </Select>
                          )}
                        />
                      </Form.Item>
                    </div>
                  </div>
                  <div className="px-5">
                    <Button
                      disabled={disableButton}
                      type="primary"
                      htmlType="submit"
                      className="mx-1"
                    >
                      Cập nhật
                    </Button>
                    <Button
                      type="danger"
                      htmlType="button"
                      className="mx-1"
                      onClick={handleHideEdit}
                    >
                      Hủy
                    </Button>
                  </div>
                </Form>
              </div>
            </div>
          )}

          <div>
            <FormOutlined
              style={{ fontSize: "20px" }}
              title="Sửa thông tin"
              hidden={!hideEdit}
              onClick={handleHideEdit}
            />
            <CloseSquareOutlined
              style={{ fontSize: "20px" }}
              title="Hủy"
              hidden={hideEdit}
              onClick={handleHideEdit}
            />
          </div>
        </div>
      </div>
      <PopupModal visible={visible} closable={false}>
        <div className="flex justify-center items-center">
          <p>
            Bạn đã thay đổi role tài khoản! Vui lòng đăng xuất và đăng nhập lại
            để sử dụng tính năng
          </p>
          <div className="mt-5">
            <Button
              type="danger"
              onClick={() => {
                dispatch(logout());
                dispatch(resetAccountReducer());
              }}
            >
              Đăng xuất
            </Button>
          </div>
        </div>
      </PopupModal>
    </>
  );
};

export default AccountProfile;
