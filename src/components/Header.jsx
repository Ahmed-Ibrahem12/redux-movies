import { Button } from "@material-tailwind/react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  changeBtn,
  changeNum,
  getSearchMovie,
  getSearchSeries,
} from "../redux/Slices/movieSearch";

const Header = () => {
  const [text, setText] = useState("");
  const [text2, setText2] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { SearchMovie, SearchSeries, change } = useSelector(
    (state) => state.movieSearch
  );

  useEffect(() => {
    dispatch(getSearchMovie(""));
    dispatch(getSearchSeries(""));
  }, [dispatch]);

  // handle search movie
  useEffect(() => {
    if (!change && text.trim() !== "") {
      const timer = setTimeout(() => {
        dispatch(getSearchMovie(text));
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [text, change, dispatch]);

  // handle search series
  useEffect(() => {
    if (change && text2.trim() !== "") {
      const timer = setTimeout(() => {
        dispatch(getSearchSeries(text2));
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [text2, change, dispatch]);

  return (
    <div className="sticky top-0 z-20">
      <nav className="relative bg-gray-900 flex w-full flex-wrap items-center justify-between bg-zinc-50 py-2 shadow-dark-mild dark:bg-neutral-700 lg:py-4">
        <div className="flex w-full flex-wrap items-center justify-between px-3">
          <div className="flex w-full sm:w-auto justify-between items-center">
            <span
              className="ms-2 text-xl text-white dark:text-white cursor-pointer"
              onClick={() => navigate("/")}
            >
              Ody Movies
            </span>
            <div className="flex">
              <motion.div whileTap={{ scale: 0.9 }}>
                <Button
                  variant="outlined"
                  className="text-white cursor-pointer ms-2 bg-blue-700 p-2 rounded"
                  onClick={() => navigate("/movies")}
                >
                  Movies
                </Button>
              </motion.div>
              <motion.div whileTap={{ scale: 0.9 }}>
                <Button
                  variant="outlined"
                  className="text-white cursor-pointer ms-2 bg-red-700 p-2 rounded"
                  onClick={() => navigate("/series")}
                >
                  Series
                </Button>
              </motion.div>
            </div>
          </div>

          <div className="sm:ms-5 flex sm:w-[30%] w-full items-center justify-between mt-2">
            {change ? (
              <input
                type="search"
                className="relative text-white m-0 block sm:w-[1px] min-w-0 flex-auto rounded-lg border border-solid border-secondary-500 bg-transparent bg-clip-padding px-3 py-1.5 text-base font-normal text-surface transition duration-300 ease-in-out focus:border-primary focus:text-white focus:shadow-inset focus:outline-none motion-reduce:transition-none dark:border-white/10 dark:bg-body-dark dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill"
                placeholder="Search Series"
                aria-label="Search"
                value={text2}
                onChange={(e) => setText2(e.target.value)}
              />
            ) : (
              <input
                type="search"
                className="relative text-white m-0 block sm:w-[1px] min-w-0 flex-auto rounded-lg border border-solid border-secondary-500 bg-transparent bg-clip-padding px-3 py-1.5 text-base font-normal text-surface transition duration-300 ease-in-out focus:border-primary focus:text-white focus:shadow-inset focus:outline-none motion-reduce:transition-none dark:border-white/10 dark:bg-body-dark dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill"
                placeholder="Search Movies"
                aria-label="Search"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            )}

            <motion.div whileTap={{ scale: 0.9 }}>
              <Button
                size="sm"
                variant="filled"
                className={
                  change
                    ? "text-white bg-blue-700 ms-2 py-[10px]"
                    : "text-white bg-red-700 ms-2 py-[10px]"
                }
                onClick={() => {
                  dispatch(changeBtn());
                  setText("");
                  setText2("");
                }}
              >
                {change ? "Movies" : "Series"}
              </Button>
            </motion.div>
          </div>
        </div>
      </nav>

      {/* Movies Results */}
      <div
        className={
          text.trim() === ""
            ? "z-0 h-0 w-0"
            : "absolute bg-gray-900 flex rounded text-white sm:right-2 w-full sm:w-[30%] h-96 z-20 flex flex-col overflow-auto"
        }
      >
        {SearchMovie?.results?.map((mov, i) => (
          <div
            key={i}
            className="flex p-2 items-center z-30 text-white hover:bg-gray-700 rounded cursor-pointer"
            onClick={() => {
              navigate(`/movies/${mov.id}`);
              setText("");
            }}
          >
            <img
              src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${mov.poster_path}`}
              className="rounded-[50%] me-2"
              width={30}
            />
            <h4>{mov.title}</h4>
          </div>
        ))}
      </div>

      {/* Series Results */}
      <div
        className={
          text2.trim() === ""
            ? "z-0 h-0 w-0"
            : "absolute bg-gray-900 flex text-white sm:right-2 w-full sm:w-[30%] h-96 z-20 flex flex-col overflow-auto rounded"
        }
      >
        {SearchSeries?.results?.map((mov, i) => (
          <div
            key={i}
            className="flex p-2 items-center z-30 text-white hover:bg-gray-700 rounded cursor-pointer"
            onClick={() => {
              navigate(`/series/${mov.id}`);
              setText2("");
            }}
          >
            <img
              src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${mov.poster_path}`}
              className="rounded-[50%] me-2"
              width={30}
            />
            <h4>{mov.name}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Header;
