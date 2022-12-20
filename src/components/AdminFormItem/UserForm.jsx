import React, { useEffect, useState } from "react";
import { Button, Form, Input, notification, Select } from "antd";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { GROUPID } from "services/axiosClient";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser, updateUser } from "redux/slices/adminSlice";
import accountAPI from "services/accountAPI";

const UserForm = ({ editUser }) => {
  const [disableButton, setDisableButton] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { getAccountRole } = accountAPI;
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const data = await getAccountRole();
        setRoles(data);
      } catch (error) {}
    };
    fetchRole();
  }, []);

  const registationSchema = yup.object().shape({
    taiKhoan: yup
      .string()
      .required("Tài khoản không được trống!")
      .default(editUser?.taiKhoan ?? ""),
    matKhau: yup
      .string()
      .required("Mật khẩu không được trống!")
      .min(6, "Mật khẩu ít nhất 6 ký tự")
      .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{6,}$/, "Mật khẩu yếu!")
      .default(editUser?.matKhau ?? ""),
    email: yup
      .string()
      .email("Email không đúng định dạng")
      .required("Email không được trống!")
      .default(editUser?.email ?? ""),
    soDT: yup
      .string()
      .required("Số DT không được trống!")
      .matches(/^[0-9]+$/, "Số DT không đúng định dạng")
      .default(editUser?.soDT ?? ""),
    maLoaiNguoiDung: yup
      .string()
      .required()
      .default(editUser?.maLoaiNguoiDung ?? "KhachHang"),
    hoTen: yup
      .string()
      .required("Họ tên không được trống!")
      .matches(
        "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
          "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
          "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$",
        "Tên chỉ gồm ký tự từ a->z"
      )
      .default(editUser?.hoTen ?? ""),
    maNhom: yup.string().required().default(GROUPID),
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    getFieldState,
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(registationSchema),
    defaultValues: {
      taiKhoan: editUser?.taiKhoan ?? "",
      matKhau: editUser?.matKhau ?? "",
      email: editUser?.email ?? "",
      soDT: editUser?.soDT ?? "",
      maLoaiNguoiDung: editUser?.maLoaiNguoiDung ?? "KhachHang",
      hoTen: editUser?.hoTen ?? "",
      maNhom: GROUPID,
    },
  });

  const onSubmit = (values) => {
    setDisableButton(false);

    if (editUser) {
      dispatch(updateUser(values));
    } else {
      dispatch(addUser(values));
    }
  };

  const onError = () => {
    setDisableButton(true);

    if (errors) {
      notification["error"]({
        message: "Trường thông tin rỗng",
        description: "Vui lòng kiểm tra và nhập lại các trường thông tin",
      });
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="pr-5 md:w-1/2 md:p-5 bg-white rounded-md">
        <Form
          autoComplete="off"
          onFinish={handleSubmit(onSubmit, onError)}
          layout="horizontal"
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 20,
          }}
        >
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
              defaultValue={editUser?.taiKhoan ?? ""}
              render={({ field }) => (
                <Input
                  {...field}
                  disabled={editUser?.taiKhoan}
                  className="w-full px-3  border rounded-md"
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
              defaultValue={editUser?.matKhau ?? ""}
              render={({ field }) => (
                <Input.Password {...field} className="w-full px-3  border rounded-md" placeholder="Nhập mật khẩu" />
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
              defaultValue={editUser?.email ?? ""}
              render={({ field }) => (
                <Input className="w-full px-3  border rounded-md" placeholder="Nhập Email" {...field} />
              )}
            />
          </Form.Item>
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
              defaultValue={editUser?.soDT ?? ""}
              render={({ field }) => (
                <Input className="w-full px-3  border rounded-md" placeholder="Số ĐT" {...field} />
              )}
            />
          </Form.Item>
          <Form.Item
            label="Họ Tên"
            required
            hasFeedback
            validateStatus={errors.hoTen ? "error" : ""}
            help={errors.hoTen?.message}
          >
            <Controller
              control={control}
              name="hoTen"
              defaultValue={editUser?.hoTen ?? ""}
              render={({ field }) => (
                <Input className="w-full px-3 border rounded-md" placeholder="Họ tên" {...field} />
              )}
            />
          </Form.Item>

          <Form.Item
            label="Role"
            required
            hasFeedback
            validateStatus={errors.maLoaiNguoiDung ? "error" : ""}
            help={errors.maLoaiNguoiDung?.message}
          >
            <Controller
              control={control}
              name="maLoaiNguoiDung"
              defaultValue={editUser?.maLoaiNguoiDung ?? "KhachHang"}
              render={({ field }) => (
                <Select {...field}>
                  {roles.length &&
                    roles.map((role, index) => (
                      <Select.Option key={index} value={role.maLoaiNguoiDung}>
                        {role.tenLoai}
                      </Select.Option>
                    ))}
                </Select>
              )}
            />
          </Form.Item>

          <div className="pt-5 md:mx-20">
            <Button disabled={disableButton} type="primary" htmlType="submit" className="mx-5">
              {editUser ? "Sửa user" : "Thêm user"}
            </Button>
            <Button
              type="danger"
              htmlType="button"
              className="mx-5"
              onClick={() => {
                reset();
                setDisableButton(false);
              }}
            >
              Nhập lại
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default UserForm;
