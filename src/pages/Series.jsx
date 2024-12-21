import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  decrement,
  increment,
  getSeriesHome,
} from "../redux/Slices/homeSeries";
import ReactStars from "react-stars";
import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

const Series = () => {
  const { HomeSeries, number } = useSelector((state) => state.homeSeries);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      dispatch(getSeriesHome(number));
    }, 500);
  }, [number]);

  return (
    <div>
      <div className="flex flex-col justify-center">
        <h1 className="text-[1.7em] font-bold mb-7 mt-8">Series</h1>
        <h2 className="text-[1.3em]">
          Page <span className="text-red-700 font-bold">{number}</span> From 500
        </h2>
        <div className="flex flex-col sm:flex-row sm:flex-wrap justify-center text-black">
          {HomeSeries?.results.map((ser, i) => (
            <div
              key={i}
              className="block max-w-[18rem] rounded-lg bg-white text-surface shadow-secondary-1 m-8 dark:bg-surface-dark dark:text-white"
            >
              <div className="relative overflow-hidden bg-cover bg-no-repeat">
                <img
                  className="rounded-t-lg"
                  src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${ser.poster_path}`}
                  alt=""
                />
              </div>
              <div className="p-6 ">
                <p className="text-base font-bold">{ser.name}</p>
              </div>
              <div className="flex justify-between items-center p-2">
                <p>Rate : {ser.vote_average}</p>
                <ReactStars
                  count={5}
                  value={ser.vote_average}
                  size={24}
                  color2={"#ffd700"}
                />
              </div>
              <Button
                className="mb-3"
                onClick={() => navigate(`/series/${ser.id}`)}
              >
                Details
              </Button>
            </div>
          ))}
        </div>
        <div className="w-100 m-auto mt-7 mb-7">
          <nav aria-label="Page navigation example m-auto">
            <ul className="list-style-none flex">
              <li onClick={() => dispatch(decrement())}>
                <a className=" cursor-pointer relative block rounded bg-transparent px-3 py-1.5 text-sm text-surface/50 transition duration-300 dark:text-neutral-400">
                  Previous
                </a>
              </li>

              <li aria-current="page">
                <a className="relative block rounded bg-white px-3 py-1.5 text-sm font-medium text-black transition duration-300 focus:outline-none dark:bg-slate-900 dark:text-primary-500">
                  {number}
                  <span className="absolute -m-px h-px w-px overflow-hidden whitespace-nowrap border-0 p-0 [clip:rect(0,0,0,0)]">
                    (current)
                  </span>
                </a>
              </li>

              <li onClick={() => dispatch(increment())}>
                <a className="relative block rounded cursor-pointer bg-transparent px-3 py-1.5 text-sm text-surface transition duration-300 hover:bg-neutral-100 focus:bg-neutral-100 focus:text-primary-700 focus:outline-none active:bg-neutral-100 active:text-primary-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:focus:text-primary-500 dark:active:bg-neutral-700 dark:active:text-primary-500">
                  Next
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Series;
