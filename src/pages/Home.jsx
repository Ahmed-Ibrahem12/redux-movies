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
    <div className="text-center bg-black text-white flex justify-center w-full items-center flex-col ">
      <div className="flex justify-around w-full mt-5 mb-5 flex-col ">
        <div className="w-full">
          <h1 className="text-[1.3em] mt-3">Sort By</h1>
          <div className=" flex justify-evenly mt-4 mb-4">
            <Button variant="gradient">Title</Button>
            <Button variant="gradient">Date</Button>
            <Button variant="gradient">Poplirty</Button>
            <Button variant="gradient">Rate</Button>
          </div>
        </div>
        <div className="w-full">
          <h1 className="text-[1.3em] mt-3">Sort Order</h1>
          <div className=" flex justify-evenly mt-4 mb-4">
            <Button variant="gradient">Descingin</Button>
            <Button variant="gradient">Ascending</Button>
          </div>
        </div>
      </div>

      <div className="flex flex-col w-full justify-center items-center">
        <h1 className=" text-red-700 text-[2em] font-bold mb-5">Movies</h1>
        <div className="w-full container">
          <MovisSlider />
        </div>
        <h1 className=" text-red-700 text-[2em] font-bold mt-5 mb-5">Series</h1>
        <div className="w-full container">
          <SeriesSlider />
        </div>
      </div>
      <div className="flex flex-col text-center">
        <h1 className=" text-red-700 text-[2em] font-bold mt-7 mb-7">
          Top Movies
        </h1>
        <TopMovies />
      </div>
      <div className="flex flex-col text-center">
        <h1 className=" text-red-700 text-[2em] font-bold mt-7 mb-7">
          Top Series
        </h1>
        <TopSeries />
      </div>
    </div>
  );
};

export default Home;
