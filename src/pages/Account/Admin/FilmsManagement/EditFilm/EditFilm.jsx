import React, { useEffect } from "react";
import FilmForm from "components/AdminFormItem/FilmForm";
import { useDispatch, useSelector } from "react-redux";
import PageLoading from "components/Loading/PageLoading";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { fetchEditMovieData, resetAdminActionStatus } from "redux/slices/adminSlice";
import { notification, Button } from "antd";

const EditFilm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { editMovieData, isLoading, actionSuccess, actionResponeAPI, error } = useSelector(
    (state) => state.admin
  );

  const { movieId } = useParams();

  const location = useLocation();

  // console.log(location);

  useEffect(() => {
    dispatch(fetchEditMovieData(movieId));
  }, []);

  useEffect(() => {
    if (actionSuccess && typeof actionResponeAPI === "object") {
      notification["success"]({ message: "Cập nhật phim thành công!", duration: 1.5 });
      dispatch(resetAdminActionStatus());
      dispatch(fetchEditMovieData(movieId));
      setTimeout(() => {
        navigate("/admin/films/film-list", { state: location.state });
      }, 2000);
    }
  }, [actionSuccess, actionResponeAPI]);

  if (isLoading) {
    return <PageLoading classname="h-full" />;
  }

  return (
    <div className="w-full h-full py-5">
      <span className="text-lg p-2 rounded-md bg-orange-300 font-bold">Sửa phim:</span>
      <div className="mt-5 px-1 lg:px-0">
        <FilmForm editFilm={editMovieData} />
      </div>
      <Button
        type="link"
        onClick={() => navigate("/admin/films/film-list", { state: location?.state })}
      >
        Trở về
      </Button>
    </div>
  );
};

export default EditFilm;
