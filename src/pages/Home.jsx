import { Button } from "@material-tailwind/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getHomeMovies } from "../redux/Slices/homeMovies";
import MovisSlider from "../components/MovisSlider";
import SeriesSlider from "../components/SeriesSlider";
import { getSeriesMovies } from "../redux/Slices/homeSeries";
import TopMovies from "../components/TopMovies";
import TopSeries from "./../components/TopSeries";
import Footer from "./../components/Footer";

const Home = () => {
  return (
    <div className="text-center bg-black text-white flex justify-center w-full items-center flex-col overflow-x-hidden overflow-y-hidden">
      <div className="flex flex-col w-full justify-center items-center mt-7">
        <h1 className=" text-blue-700 text-[3em] font-bold mb-5 font-sans">
          Movies
        </h1>
        <div className="w-full container p-4 overflow-hidden">
          <MovisSlider />
        </div>

        <h1 className=" text-red-700 text-[3em] font-bold mt-5 mb-5">Series</h1>
        <div className="w-full container p-4 overflow-hidden">
          <SeriesSlider />
        </div>
      </div>

      <div className="flex flex-col text-center">
        <h1 className=" text-blue-700 text-[3em] font-bold mt-7 mb-7">
          Top Movies
        </h1>
        <div className="overflow-hidden">
          <TopMovies />
        </div>
      </div>

      <div className="flex flex-col text-center mb-10">
        <h1 className=" text-red-700 text-[3em] font-bold mt-7 mb-7">
          Top Series
        </h1>
        <div className="overflow-hidden">
          <TopSeries />
        </div>
      </div>
    </div>
  );
};

export default Home;
