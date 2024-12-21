import { Button } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  changeBtn,
  changeNum,
  getSearchMovie,
  getSearchSeries,
} from "../redux/Slices/movieSearch";

const Header = () => {
  const [text, SetText] = useState("");
  const [text2, SetText2] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { SearchMovie, SearchSeries, change, num } = useSelector(
    (state) => state.movieSearch
  );

  useEffect(() => {
    dispatch(getSearchMovie());
    dispatch(getSearchSeries());
  }, []);

  if (text == "") {
    console.log(true);
  }

  // console.log(SearchMovie.results);

  return (
    <div className="sticky top-0 z-20">
      <nav className=" relative bg-gray-900 flex w-full flex-wrap items-center justify-between bg-zinc-50 py-2 shadow-dark-mild dark:bg-neutral-700 lg:py-4">
        <div className="flex w-full flex-wrap items-center justify-between px-3">
          <div className="flex w-full sm:w-auto justify-between">
            <span
              className="ms-2 text-xl text-white dark:text-white cursor-pointer"
              onClick={() => navigate("/")}
            >
              Ody Movies
            </span>
            <div>
              <Button
                variant="outlined"
                className="text-white cursor-pointer ms-2 bg-blue-700 p-2 rounded"
                onClick={() => navigate("/movies")}
              >
                Movies
              </Button>
              <Button
                variant="outlined"
                className="text-white cursor-pointer ms-2 bg-red-700 p-2 rounded"
                onClick={() => navigate("/series")}
              >
                Series
              </Button>
            </div>
          </div>
          <div className="sm:ms-5 flex sm:w-[30%] w-full items-center justify-between mt-2">
            {change ? (
              <input
                type="search"
                className="relative text-white m-0 block sm:w-[1px] min-w-0 flex-auto rounded-lg border border-solid border-secondary-500 bg-transparent bg-clip-padding px-3 py-1.5 text-base font-normal text-surface transition duration-300 ease-in-out focus:border-primary focus:text-white focus:shadow-inset focus:outline-none motion-reduce:transition-none dark:border-white/10 dark:bg-body-dark dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill"
                placeholder="Search Movies"
                aria-label="Search"
                aria-describedby="button-addon2"
                value={text}
                onChange={(e) => dispatch(getSearchMovie(text))}
                onChangeCapture={(e) => SetText(e.target.value)}
              />
            ) : (
              <input
                type="search"
                className="relative text-white m-0 block sm:w-[1px] min-w-0 flex-auto rounded-lg border border-solid border-secondary-500 bg-transparent bg-clip-padding px-3 py-1.5 text-base font-normal text-surface transition duration-300 ease-in-out focus:border-primary focus:text-white focus:shadow-inset focus:outline-none motion-reduce:transition-none dark:border-white/10 dark:bg-body-dark dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill"
                placeholder="Search Series"
                aria-label="Search"
                aria-describedby="button-addon2"
                value={text2}
                onChange={(e) => dispatch(getSearchSeries(text2))}
                onChangeCapture={(e) => SetText2(e.target.value)}
              />
            )}
            <Button
              size="sm"
              variant="outlined"
              className={
                change
                  ? "text-white bg-red-700 ms-2"
                  : "text-white bg-blue-700 ms-2"
              }
              onClick={() => dispatch(changeBtn())}
            >
              {change ? "Search Movie" : "Search Series"}
            </Button>
          </div>
        </div>
      </nav>

      <div
        className={
          (SearchMovie?.total_results == 0
            ? "z-0"
            : "absolute bg-gray-900 rounded flex text-white sm:right-2 w-full sm:w-[30%] h-96 z-20 flex flex-col overflow-auto",
          text == ""
            ? "z-0 h-0 w-0"
            : "absolute bg-gray-900 flex rounded text-white sm:right-2 w-full sm:w-[30%] h-96 z-20 flex flex-col overflow-auto")
        }
      >
        {SearchMovie?.results?.map((mov, i) => (
          <div key={i} onClick={() => dispatch(changeNum())}>
            <div
              className={
                text == ""
                  ? "w-0 h-0 z-0 text-transparent"
                  : "flex p-2 items-center z-30 text-white hover:bg-gray-700 rounded cursor-pointer"
              }
              onClick={() => navigate(`/movies/${mov.id}`)}
              onClickCapture={() => SetText("")}
            >
              <img
                src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${mov.poster_path}`}
                className="rounded-[50%] me-2"
                width={30}
              />
              <h4>{mov.title}</h4>
            </div>
          </div>
        ))}
      </div>
      <div
        className={
          (SearchSeries?.total_results == 0
            ? "z-0"
            : "absolute bg-gray-900 flex text-white sm:right-2 w-full sm:w-[30%] h-96 z-20 flex flex-col overflow-auto",
          text2 == ""
            ? "z-0 h-0 w-0"
            : "absolute bg-gray-900 flex text-white sm:right-2 w-full sm:w-[30%] h-96 z-20 flex flex-col overflow-auto")
        }
      >
        {SearchSeries?.results?.map((mov, i) => (
          <div key={i} onClick={() => dispatch(changeNum())}>
            <div
              className={
                text2 == ""
                  ? "w-0 h-0 z-0 text-transparent"
                  : "flex p-2 items-center z-30 text-white hover:bg-gray-700 rounded cursor-pointer"
              }
              onClick={() => navigate(`/series/${mov.id}`)}
              onClickCapture={() => SetText2("")}
            >
              <img
                src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${mov.poster_path}`}
                className="rounded-[50%] me-2"
                width={30}
              />
              <h4>{mov.name}</h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Header;
