import React, { useEffect } from "react";
import Slider from "react-slick";
import { useDispatch, useSelector } from "react-redux";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getSeriesHome } from "../redux/Slices/homeSeries";

const SeriesSlider = () => {
  const { HomeSeries } = useSelector((state) => state.homeSeries);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSeriesHome());
  }, []);

  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className=" sm:container sm:w-full ">
      <Slider {...settings}>
        {HomeSeries?.results.map((ser, i) => (
          <div key={i} className="p-16 md:p-4">
            <img
              src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${ser.poster_path}`}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SeriesSlider;
