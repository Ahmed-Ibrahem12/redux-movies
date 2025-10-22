import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import { useDispatch, useSelector } from "react-redux";
import { getSeriesHome } from "../redux/Slices/homeSeries";
import { useNavigate } from "react-router-dom";
import Loader from "./loader/Loader";

const SeriesSlider = () => {
  const { HomeSeries, loading } = useSelector((state) => state.homeSeries);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getSeriesHome());
  }, [dispatch]);

  if (loading) return <Loader />;

  return (
    <div className="w-full sm:container px-4 py-6">
      <Swiper
        modules={[Autoplay, Navigation]}
        // navigation
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        loop={false}
        speed={800}
        spaceBetween={20}
        breakpoints={{
          320: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }}
        className="mySwiper"
      >
        {HomeSeries?.results?.map((ser, i) => (
          <SwiperSlide key={i}>
            <div
              className="cursor-pointer transition-transform duration-300 hover:scale-105"
              onClick={() => navigate(`/series/${ser.id}`)}
            >
              <img
                src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${ser.poster_path}`}
                alt={ser.name || "Series Poster"}
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SeriesSlider;
