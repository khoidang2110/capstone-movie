import React, { useEffect, useRef, useState } from "react";
import { Pagination } from "antd";
import FilmItem from "components/FilmItem/FilmItem";
import { useSelector, useDispatch } from "react-redux";
import { getMovieListPagination } from "redux/slices/moviesSlice";
import useModalHook from "utils/useModalHook";
import PopupModal from "components/Modal/PopupModal";

export const moviesRef = React.createRef();

const MovieShowing = () => {
  const dispatch = useDispatch();

  const { visible, showModal, closeModal } = useModalHook();
  const [trailer, setTrailer] = useState();

  const {
    data,
    moviesPagination: { currentPage, count, items, totalCount },
    isMoviesLoading,
    error,
  } = useSelector((state) => {
    return state.movies;
  });

  const handleChangePage = (page) => {
    dispatch(getMovieListPagination({ page: page }));
    moviesRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const handleChangeTrailer = (value) => {
    setTrailer(value);
  };

  const multiMethod = {
    showModal: showModal,
    onChangeTrailer: handleChangeTrailer,
  };

  return (
    <div className="container mx-auto text-center px-5 md:px-15 lg:px-20 xl:px-40 mt-10 mb-5" ref={moviesRef}>
      <div className={`grid grid-cols-2 gap-5 sm:gap-7 md:grid-cols-3 lg:gap-9 xl:grid-cols-4 xl:gap-5 relative`}>
        {items &&
          items.map((movie) => {
            return <FilmItem movie={movie} key={movie.maPhim} isLoading={isMoviesLoading} modal={multiMethod} />;
          })}
      </div>

      <div className="mt-5">
        <Pagination
          responsive={true}
          pageSize={8}
          showSizeChanger={false}
          current={currentPage}
          total={totalCount}
          onChange={handleChangePage}
        />
      </div>

      <PopupModal
        visible={visible}
        onCancel={closeModal}
        className={"w-5/6 h-3/6 sm:h-2/4 md:h-3/5 lg:h-4/6 xl:h-5/6 2xl:h-5/6"}
        closeIcon={<></>}
        bodyStyle={{ padding: "0px", height: "100%" }}
      >
        {
          <iframe
            src={trailer}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen={true}
            className="w-full h-full"
          />
        }
      </PopupModal>
    </div>
  );
};

export default MovieShowing;
