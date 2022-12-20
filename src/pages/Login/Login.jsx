import React, { useEffect } from "react";
import { Button, Input, Form, Checkbox, notification } from "antd";
import { NavLink, Navigate, useLocation, useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";

import { login } from "redux/slices/authSlice";

const Login = () => {
  window.scrollTo({ top: 0 });

  const distpach = useDispatch();
  const navigate = useNavigate();

  const { currentUser, isLoggedIn, error, isLoginLoading } = useSelector((state) => {
    return state.auth;
  });

  const loginSchema = yup.object().shape({
    taiKhoan: yup.string().required("Username is required!").default(""),
    matKhau: yup.string().required("Password is required!").default(""),
    isRemember: yup.boolean().default(false),
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode: "onTouched",
  });

  const onSubmit = (values) => {
    distpach(login(values));
  };

  useEffect(() => {
    if (isLoggedIn) {
      notification["success"]({
        message: "Đăng nhập thành công",
        description: location?.state ? "Chuyển về trang đặt vé" : "Chuyển về trang chủ",
        duration: 1,
      });

      setTimeout(() => {
        navigate(location.state?.from ?? "/", { replace: true });
      }, 1000);
    }
  }, [isLoggedIn]);

  const location = useLocation();

  // if (Object.keys(currentUser).length) {
  //   // Redirect user về trang Home
  //   return <Navigate to={location.state?.from ?? "/"} replace />;
  // }

  return (
    <div className="min-h-full">
      <div className="w-full mx-auto px-5 py-10 md:w-2/3 lg:w-1/3">
        <div className="flex flex-col px-10 rounded-md bg-white dark:text-gray-100 border border-slate-300">
          <div className="text-center">
            <h1 className="my-3 text-4xl font-bold">Đăng nhập</h1>
            <p className="text-sm dark:text-gray-400">Đăng nhập để truy cập tài khoản của bạn</p>
          </div>
          <Form autoComplete="off" onFinish={handleSubmit(onSubmit)} layout="vertical">
            <Form.Item
              label="Tài khoản"
              required
              validateStatus={errors.taiKhoan ? "error" : ""}
              help={errors.taiKhoan?.message}
            >
              <Controller
                control={control}
                name="taiKhoan"
                render={({ field: { value, name, ref, onBlur, onChange } }) => (
                  <Input
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="Enter Username"
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    name={name}
                    ref={ref}
                  />
                )}
              />
            </Form.Item>
            <Form.Item
              label="Mật khẩu"
              required
              validateStatus={errors.matKhau ? "error" : ""}
              help={errors.matKhau?.message}
            >
              <Controller
                control={control}
                name="matKhau"
                render={({ field: { value, name, ref, onBlur, onChange } }) => (
                  <Input.Password
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="Enter Password"
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    name={name}
                    ref={ref}
                  />
                )}
              />
            </Form.Item>
            <Form.Item>
              <Controller
                control={control}
                name="isRemember"
                render={({ field: { name, ref, onChange } }) => (
                  <Checkbox name={name} ref={ref} onChange={onChange}>
                    Ghi nhớ đăng nhập
                  </Checkbox>
                )}
              />
            </Form.Item>
            {isLoginLoading && (
              <div className="flex justify-center">
                <div className="w-10 h-10 border-4 border-dashed rounded-full animate-spin dark:border-orange-600"></div>
              </div>
            )}
            {error && <p className="text-red-600">{error}</p>}

            <div className="pt-5">
              <Button
                htmlType="submit"
                className="w-full px-8 flex justify-center items-center py-6 font-semibold rounded-md bg-orange-600 text-white transition-colors border-orange-600 hover:bg-orange-700"
              >
                Login
              </Button>

              <p className="mt-3 px-6 text-sm text-center dark:text-gray-400">
                Don't have an account yet?
                <NavLink to="/register" className="ml-1 hover:underline text-orange-600">
                  Register
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

export default Login;
