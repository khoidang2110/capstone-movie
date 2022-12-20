import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { Button, Input, Form, Checkbox, notification } from "antd";
import { register } from "redux/slices/authSlice";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { resetRegisterStatus } from "redux/slices/authSlice";
import { GROUPID } from "services/axiosClient";
import PageLoading from "components/Loading/PageLoading";

const Register = () => {
  // window.scrollTo(0, 0);
  const [disableButton, setDisableButton] = useState(false);

  const [fakeLoading, setFakeLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentUser, isRegisterLoading, isRegisterSuccess, error } = useSelector((state) => {
    return state.auth;
  });

  const registationSchema = yup.object().shape({
    taiKhoan: yup.string().required("Tài khoản không được trống!").default(""),
    matKhau: yup
      .string()
      .required("Mật khẩu không được trống!")
      .default("")
      .min(6, "Mật khẩu ít nhất 6 ký tự")
      .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{6,}$/, "Mật khẩu yếu!"),
    confirmPassword: yup
      .string()
      .required("Vui lòng xác nhận lại mật khẩu!")
      .default("")
      .oneOf([yup.ref("matKhau")], "Mật khẩu không khớp"),
    email: yup.string().email("Email không đúng định dạng").required("Email không được trống!").default(""),
    soDt: yup
      .string()
      .required("Số DT không được trống!")
      .matches(/^[0-9]+$/, "Số DT không đúng định dạng")
      .default(""),
    hoTen: yup
      .string()
      .required("Họ tên không được trống!")
      .matches(
        "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
          "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
          "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$",
        "Tên chỉ gồm ký tự từ a->z"
      )
      .default(""),
    acceptTerms: yup
      .boolean()
      .required("Vui lòng chấp nhận điều khoản dịch vụ!")
      .oneOf([true], "Vui lòng chấp nhận điều khoản dịch vụ!")
      .default(false),
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitSuccessful, isValid },
    reset,
    getFieldState,
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(registationSchema),
  });

  const onSubmit = (values) => {
    const { taiKhoan, matKhau, email, soDt, hoTen } = values;
    const registerValues = {
      taiKhoan,
      matKhau,
      email,
      soDt,
      hoTen,
      maNhom: GROUPID,
    };
    dispatch(register(registerValues));
    setDisableButton(false);
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

  useEffect(() => {
    if (isRegisterSuccess) {
      notification["success"]({
        message: "Đăng ký thành công",
        description: "Chuyển về trang đăng nhập sau 3s",
        duration: 1.5,
      });
      setFakeLoading(true);
      setTimeout(() => {
        setFakeLoading(false);
        navigate("/login");
      }, 3000);
      reset({ keepDefaultValues: true });

      dispatch(resetRegisterStatus());
    }
    if (error) {
      notification["error"]({ message: "Đăng ký thất bại", description: error });
    }

    if (isValid) {
      setDisableButton(false);
    }
  }, [isRegisterSuccess, error, isSubmitSuccessful, isValid]);

  if (Object.keys(currentUser).length) {
    return <Navigate to="/" replace />;
  }

  if (fakeLoading) {
    return <PageLoading />;
  }

  return (
    <div className="min-h-full">
      <div className="w-full py-2 md:py-5 px-5 mx-auto md:w-2/3 lg:w-1/3">
        <div className="flex flex-col px-10 rounded-md bg-white dark:text-gray-100">
          <div className="text-center">
            <h1 className="my-3 text-4xl font-bold">Đăng ký</h1>
            <p className="text-sm dark:text-gray-400">...</p>
          </div>
          <Form autoComplete="off" onFinish={handleSubmit(onSubmit, onError)} layout="vertical">
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
                render={({ field }) => (
                  <Input {...field} className="w-full px-3 py-2 border rounded-md" placeholder="Nhập tài khoản" />
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
                render={({ field }) => (
                  <Input.Password
                    {...field}
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="Nhập mật khẩu"
                  />
                )}
              />
            </Form.Item>
            <Form.Item
              label="Xác nhận mật khẩu"
              required
              hasFeedback
              validateStatus={errors.confirmPassword ? "error" : ""}
              help={errors.confirmPassword?.message}
            >
              <Controller
                control={control}
                name="confirmPassword"
                render={({ field }) => (
                  <Input.Password
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="Nhập lại password"
                    {...field}
                  />
                )}
              />
            </Form.Item>
            <Form.Item
              label="Email"
              required
              hasFeedback
              validateStatus={errors.email ?? error ? "error" : ""}
              help={errors.email?.message ?? error}
            >
              <Controller
                control={control}
                name="email"
                render={({ field }) => (
                  <Input
                    onFocus={() => {
                      dispatch(resetRegisterStatus());
                    }}
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="Nhập Email"
                    {...field}
                  />
                )}
              />
            </Form.Item>
            <Form.Item
              label="Số ĐT"
              required
              hasFeedback
              validateStatus={errors.soDt ? "error" : ""}
              help={errors.soDt?.message}
            >
              <Controller
                control={control}
                name="soDt"
                render={({ field }) => (
                  <Input className="w-full px-3 py-2 border rounded-md" placeholder="Số ĐT" {...field} />
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
                render={({ field }) => (
                  <Input className="w-full px-3 py-2 border rounded-md" placeholder="Họ tên" {...field} />
                )}
              />
            </Form.Item>
            <Form.Item required hasFeedback>
              <Controller
                control={control}
                name="acceptTerms"
                render={({ field: { name, onChange, ref, value } }) => (
                  <Checkbox
                    name={name}
                    onChange={(e) => onChange(e.target.checked)}
                    checked={value}
                    ref={ref}
                    className="mt-3"
                  >
                    <p className={errors.acceptTerms && "text-red-500"}>Chấp nhận các điều khoản</p>
                  </Checkbox>
                )}
              />
            </Form.Item>
            {isRegisterLoading && (
              <div className="flex justify-center">
                <div className="w-10 h-10 border-4 border-dashed rounded-full animate-spin dark:border-orange-600"></div>
              </div>
            )}

            <div>
              <Button
                disabled={disableButton}
                htmlType="submit"
                className="w-full px-8 flex justify-center items-center py-6 font-semibold rounded-md bg-orange-600 text-white transition-colors border-orange-600 hover:bg-orange-700"
              >
                Đăng ký ngay!
              </Button>

              <p className="mt-3 px-6 text-sm text-center dark:text-gray-400">
                Đã có tài khoản?
                <NavLink to="/login" className="ml-1 hover:underline text-orange-600">
                  Đăng nhập
                </NavLink>
                .
              </p>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Register;
