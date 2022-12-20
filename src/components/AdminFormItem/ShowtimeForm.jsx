import React, { useEffect, useState } from "react";
import { Button, DatePicker, Form, Input, InputNumber, notification, Select, Switch } from "antd";
import moment from "moment";
import { useForm, Controller } from "react-hook-form";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import theaterAPI from "services/theaterAPI";
import { useParams } from "react-router-dom";
import { createShowtime } from "redux/slices/adminSlice";

const ShowtimeForm = () => {
  const dispatch = useDispatch();
  const { movieId } = useParams();

  const { getTheaterBrands, getTheaterBranchByBrand } = theaterAPI;

  const [showtimeState, setShowtimeState] = useState({
    heThongRap: [],
    brandId: "",
    cumRap: [],
  });

  useEffect(() => {
    const fetchBrandsData = async () => {
      try {
        const data = await getTheaterBrands();

        setShowtimeState({ ...showtimeState, heThongRap: [...data] });
      } catch (error) {}
    };
    fetchBrandsData();
  }, []);

  // const handleSelectBrand = async (brandId) => {
  //   try {
  //     const data = await getTheaterBranchByBrand(brandId);
  //     setShowtimeState({ ...showtimeState, cumRap: [...data] });
  //   } catch (error) {}
  // };
  const handleSelectBrand = (brandId) => {
    setShowtimeState({ ...showtimeState, brandId: brandId });
  };

  useEffect(() => {
    if (showtimeState.brandId) {
      resetField("maCumRap");
      (async () => {
        try {
          const data = await getTheaterBranchByBrand(showtimeState.brandId);
          setShowtimeState({ ...showtimeState, cumRap: [...data] });
        } catch (error) {}
      })();
    }
  }, [showtimeState.brandId]);

  const filmItemSchema = yup.object().shape({
    maPhim: yup.number().required().default(parseInt(movieId)),
    maHeThongRap: yup.string().required("Chọn hệ thống rạp!"),
    maCumRap: yup.string().required("Chọn chi nhánh rạp!"),
    ngayChieuGioChieu: yup
      .date()
      .required("Chọn ngày giờ chiếu phim!")
      .typeError("Invalid date!")
      .default(moment(new Date())),
    giaVe: yup.number().required("Nhập giá vé"),
  });

  const {
    control,
    handleSubmit,
    reset,
    resetField,
    formState: { errors, isValid },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(filmItemSchema),
    defaultValues: { ngayChieuGioChieu: moment(new Date()) },
  });

  const onSubmit = (values) => {
    // console.log(moment(new Date(values.ngayChieuGioChieu)).format("DD/MM/YYYY HH:mm").toString());

    const showtime = {
      maPhim: parseInt(movieId),
      ngayChieuGioChieu: moment(values.ngayChieuGioChieu).format("DD/MM/YYYY HH:mm:ss").toString(),
      maRap: values.maCumRap,
      giaVe: Number(values.giaVe),
    };

    // console.log(showtime);

    dispatch(createShowtime(showtime));
  };
  const onError = () => {
    notification["error"]({
      message: "Thêm lịch chiếu thất bại",
      description: "Điền thông trước khi nhấn thêm",
    });
  };

  return (
    <div className="flex justify-center items-center">
      <div className="w-1/2">
        <Form
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 20,
          }}
          layout="horizontal"
          className="border rounded-md md:p-5 bg-white"
          onFinish={handleSubmit(onSubmit, onError)}
        >
          <Form.Item
            label="Hệ thống rạp"
            required
            hasFeedback
            validateStatus={errors.maHeThongRap ? "error" : isValid ? "success" : ""}
            help={errors.maHeThongRap?.message}
          >
            <Controller
              control={control}
              name="maHeThongRap"
              render={({ field }) => (
                <Select
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    handleSelectBrand(e);
                  }}
                >
                  {showtimeState.heThongRap?.map((brand, index) => (
                    <Select.Option key={index} value={brand.maHeThongRap} />
                  ))}
                </Select>
              )}
            />
          </Form.Item>

          <Form.Item
            label="Cụm rạp"
            required
            hasFeedback
            validateStatus={errors.maCumRap ? "error" : isValid ? "success" : ""}
            help={errors.maCumRap?.message}
          >
            <Controller
              control={control}
              name="maCumRap"
              defaultValue={showtimeState.cumRap[0]?.maCumRap ?? ""}
              render={({ field }) => (
                <Select {...field}>
                  {showtimeState.cumRap?.map((branch, index) => (
                    <Select.Option key={index} value={branch.maCumRap}>
                      {branch.tenCumRap}
                    </Select.Option>
                  ))}
                </Select>
              )}
            />
          </Form.Item>

          <Form.Item
            label="Ngày chiếu"
            required
            hasFeedback
            validateStatus={errors.ngayChieuGioChieu ? "error" : isValid ? "success" : ""}
            help={errors.ngayChieuGioChieu?.message}
          >
            <Controller
              control={control}
              name="ngayChieuGioChieu"
              render={({ field }) => <DatePicker showTime={true} {...field} format={"DD/MM/YYYY HH:mm"} allowClear />}
            />
          </Form.Item>

          <Form.Item
            label="Giá vé"
            required
            hasFeedback
            validateStatus={errors.giaVe ? "error" : isValid ? "success" : ""}
            help={errors.giaVe?.message}
          >
            <Controller control={control} name="giaVe" render={({ field }) => <Input {...field} allowClear />} />
          </Form.Item>

          <Form.Item className="mt-5">
            <Button type="primary" htmlType="submit" className="mx-5">
              Thêm lịch chiếu
            </Button>
            <Button type="danger" htmlType="button" className="mx-5" onClick={() => reset({})}>
              Chọn lại
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ShowtimeForm;
