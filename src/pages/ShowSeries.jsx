import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  FaFileMedical,
  FaHandPointLeft,
  FaHandPointRight,
  FaTwitter,
  FaFacebook,
} from "react-icons/fa";
import { FaRegStar } from "react-icons/fa6";
import { TiVideo } from "react-icons/ti";
import { RiInstagramFill } from "react-icons/ri";
import { AiFillHome } from "react-icons/ai";
import ReadMoreArea from "@foxeian/react-read-more";
import "./background.css";

import Loader from "./../components/loader/Loader";

import { Button } from "@material-tailwind/react";
import {
  getSeriesRecommend,
  getSeriesReviews,
  increment,
} from "./../redux/Slices/seriesReview";
import { getSeriesCast, getSeriesDetails } from "../redux/Slices/seriesDetails";
import { getSeriesVideos } from "../redux/Slices/videos";
import { Dialog, DialogBody } from "@material-tailwind/react";

const ShowSeries = () => {
  const { SeriesDetails, loading, SeriesCast } = useSelector(
    (state) => state.seriesDetails
  );
  const { SeriesReview, SeriesRecommend, number } = useSelector(
    (state) => state.seriesReview
  );

  const { SeriesVideo } = useSelector((state) => state.videos);
  const { num } = useSelector((state) => state.movieSearch);

  const dispatch = useDispatch();
  const { seriesId } = useParams();
  const navigate = useNavigate();
  const buttonStyle = {
    color: "text-blue-500",
    fontSize: "1rem",
    padding: "1.5rem",
  };
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);

  useEffect(() => {
    // setTimeout(() => {
    dispatch(getSeriesDetails(seriesId));
    dispatch(getSeriesCast(seriesId));
    dispatch(getSeriesReviews(seriesId));
    dispatch(getSeriesRecommend(seriesId));
    dispatch(getSeriesVideos(seriesId));
    // }, 1000);
  }, [number, num]);

  // if (loading) {
  //   return <Loader />;
  // }

  return (
    <div className="w-full">
      <div
        className=" w-full felx flex-col justify-center bg-img relative "
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/w600_and_h900_bestv2${SeriesDetails?.backdrop_path})`,
        }}
      >
        <div className=" flex justify-center flex-col m-auto z-10 relative">
          <h1 className="font-bold text-[1.8em] mt-12 ">Serie Details</h1>
          <div className="mt-5 sm:w-full sm:h-full flex flex-col sm:flex-row sm:items-start justify-center items-center gap-5">
            <div className="w-1/2 sm:w-1/4 h-full ">
              <img
                src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${SeriesDetails?.poster_path}`}
              />
            </div>
            <div className="w-3/5 flex flex-col justify-start sm:items-start">
              <h1 className="text-[1.8em] text-white font-bold m-auto sm:m-0">
                {SeriesDetails?.name}
              </h1>
              <div className="mt-2 font-bold flex flex-col sm:flex-row">
                <span>{SeriesDetails?.first_air_date}</span>
                <div className="ms-3 flex items-center flex-col sm:flex-row">
                  <span>
                    <FaHandPointRight className="text-yellow-700" />
                  </span>
                  {SeriesDetails?.genres.map((p, i) => (
                    <span key={i} className="me-2 ms-2">
                      {p.name}{" "}
                    </span>
                  ))}
                  <span>
                    <FaHandPointLeft className="text-yellow-700" />
                  </span>
                </div>
              </div>
              <div className="">
                <h1 className="text-blue-500 text-[1.7em] font-bold mt-4 sm:flex sm:flex-wrap">
                  Description : {""}
                  <span className="text-[.6em] text-white">
                    {SeriesDetails?.overview}
                  </span>
                </h1>
              </div>
              <h2 className="mt-3 text-[1.6em] m-auto sm:m-0 font-bold text-blue-500">
                Casting :
              </h2>
              <div className="w-full">
                <div className="w-full">
                  <div className="flex justify-evenly items-center w-full flex-col sm:flex-row">
                    <div className="flex flex-col">
                      <span className="text-[1.3em]">
                        {SeriesCast?.cast[0]?.name}
                      </span>
                      <span className="text-yellow-700 text-[1em] font-bold">
                        {SeriesCast?.cast[0]?.known_for_department}
                      </span>
                    </div>
                    <span>||</span>
                    <div className="flex flex-col">
                      <span className="text-[1.3em]">
                        {SeriesCast?.cast[1]?.name}
                      </span>
                      <span className="text-yellow-700 text-[1em] font-bold">
                        {SeriesCast?.cast[1]?.known_for_department}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-evenly flex-col sm:flex-row items-center w-full mt-5">
                    <div className="flex flex-col">
                      <span className="text-[1.3em]">
                        {SeriesCast?.crew[0]?.name}
                      </span>
                      <span className="text-yellow-700 text-[1em] font-bold">
                        {SeriesCast?.crew[0]?.known_for_department}
                      </span>
                    </div>
                    <span>||</span>
                    <div className="flex flex-col">
                      <span className="text-[1.3em]">
                        {SeriesCast?.crew[1]?.name}
                      </span>
                      <span className="text-yellow-700 text-[1em] font-bold">
                        {SeriesCast?.crew[1]?.known_for_department}
                      </span>
                    </div>
                    <span>||</span>
                    <div className="flex flex-col">
                      <span className="text-[1.3em]">
                        {SeriesCast?.crew[2]?.name}
                      </span>
                      <span className="text-yellow-700 text-[1em] font-bold">
                        {SeriesCast?.crew[2]?.known_for_department}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-around items-center w-full mt-5">
                    <div className="flex flex-col items-center">
                      <FaFileMedical className="text-green-700 text-[1.3em] mb-2" />
                      <span>Add To WatchList</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <FaRegStar className="text-yellow-700 text-[1.3em] mb-2" />
                      <span>Rate Movie</span>
                    </div>
                    <div
                      className="flex flex-col items-center cursor-pointer"
                      onClick={handleOpen}
                    >
                      <TiVideo className="text-red-700 text-[1.3em] mb-2" />
                      <span>Watch Trailer</span>
                    </div>
                    <Dialog open={open} handler={handleOpen}>
                      <DialogBody>
                        {SeriesVideo?.results.length == 0 ? (
                          <div className="w-full bg-gray-800 flex flex-col items-start p-4 rounded">
                            <a
                              className="text-[1.2em] text-blue-700 font-bold cursor-pointer"
                              target="_blank"
                              href={`${SeriesDetails.homepage}`}
                            >
                              {SeriesDetails.homepage}
                            </a>
                          </div>
                        ) : (
                          <iframe
                            src={`https://www.youtube.com/embed/${SeriesVideo?.results[0]?.key}`}
                            className="w-full"
                            height={400}
                          ></iframe>
                        )}
                      </DialogBody>
                    </Dialog>
                  </div>
                  <Button
                    variant="outlined"
                    className="mt-5 text-white mb-4 bg-blue-700"
                    size="sm"
                    onClick={() => navigate(-1)}
                  >
                    Back Step
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full container gap-5 m-auto flex mt-5 flex-col sm:flex-row items-center sm:items-start">
        <div className="flex flex-col w-9/12 container items-start">
          <h1 className="mt-5 mb-5 text-[1.4em] font-bold">Top Billed Cast</h1>
          <div className="flex overflow-auto relative flex-nowrap w-full">
            {SeriesCast?.cast.map((p, i) => (
              <div key={i} className="text-white">
                <div className="block max-w-[18rem] ms-3 h-full w-44 rounded-lg bg-gray-800 text-surface shadow-secondary-1 dark:bg-surface-dark dark:text-white">
                  <div
                    className="relative overflow-hidden bg-cover bg-no-repeat cursor-pointer"
                    onClick={() => navigate(`/person/${p.id}`)}
                  >
                    <img
                      className="rounded-t-lg"
                      src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${p.profile_path}`}
                    />
                  </div>
                  <div className="p-3 flex items-start justify-start flex-col">
                    <h3 className="text-[1.1em] font-bold">{p.name}</h3>
                    <p className="text-base">{p.character}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 flex flex-col items-start w-full">
            <h1 className="mt-5 mb-5 text-[1.4em] font-bold">Social</h1>
            {SeriesReview?.total_results == 0 ? (
              <div className="w-full bg-gray-800 flex flex-col items-start p-4 rounded">
                <p className="text-[1.2em] font-bold">
                  There Is No Review For This Movie
                </p>
              </div>
            ) : (
              <div className="w-full bg-gray-800 flex flex-col items-start p-4 rounded">
                <h2 className="mt-4 mb-4 text-[1.2em] font-bold">
                  {SeriesReview?.results[0]?.author}
                </h2>
                <p className="mb-4">
                  This Review Written by{" "}
                  <span className="text-blue-500 font-bold">
                    {SeriesReview?.results[0]?.author}
                  </span>
                </p>

                <h4 className="text-blue-500 font-bold">Content :</h4>
                <ReadMoreArea
                  className="flex flex-col"
                  expandLabel="Read more"
                  collapseLabel="Read less"
                  textClassName="text-md text-white"
                  buttonClassName="text-base text-blue-500 p-6"
                  buttonStyle={buttonStyle}
                  lettersLimit={205}
                >
                  {SeriesReview?.results[0]?.content}
                </ReadMoreArea>
              </div>
            )}
          </div>

          <div className="mt-5 flex flex-col items-start w-full">
            <h1 className="mt-5 mb-5 text-[1.4em] font-bold">Media</h1>
            <div className="mt-5 mb-5 flex overflow-auto relative flex-nowrap w-full h-full bg-gray-900 rounded ">
              <div className="flex overflow relative flex-nowrap w-full h-full">
                {SeriesVideo?.results.length == 0 ? (
                  <div className="w-full bg-gray-800 flex flex-col items-start p-4 rounded">
                    <p className="text-[1.2em] font-bold">There is No Media</p>
                  </div>
                ) : (
                  SeriesVideo?.results?.map((p, i) => (
                    <div key={i} className=" ms-1 rounded p-1">
                      <iframe
                        src={`https://www.youtube.com/embed/${p.key}`}
                        className="rounded "
                        // frameborder="0"
                        height={300}
                      ></iframe>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          <div className="mt-5 flex flex-col items-start w-full">
            <h1 className="mt-5 mb-5 text-[1.4em] font-bold">Recommendation</h1>
            <div className="flex overflow-auto relative flex-nowrap w-full">
              {SeriesRecommend?.results.length == 0 ? (
                <div className="w-full bg-gray-800 flex flex-col items-start p-4 rounded">
                  <p className="text-[1.2em] font-bold">
                    There is No Recommendation Series
                  </p>
                </div>
              ) : (
                SeriesRecommend?.results.map((p, i) => (
                  <div
                    key={i}
                    onClick={() => dispatch(increment())}
                    className="text-white cursor-pointer"
                  >
                    <div
                      onClick={() => navigate(`/series/${p.id}`)}
                      className="block max-w-[18rem] ms-3 h-full w-44 rounded-lg bg-gray-800 text-surface shadow-secondary-1 dark:bg-surface-dark dark:text-white"
                    >
                      <div className="relative overflow-hidden bg-cover bg-no-repeat">
                        <img
                          className="rounded-t-lg"
                          src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${p.backdrop_path}`}
                        />
                      </div>
                      <div className="p-3 flex items-start justify-start flex-col">
                        <h3 className="text-[1.0em] font-bold">{p.name}</h3>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center sm:items-start w-full sm:w-1/4 gap-5">
          <div className="flex w-full justify-evenly items-center sm:items-start mt-5 mb-5 text-[1.5em] ">
            <FaFacebook className="text-blue-700" />
            <RiInstagramFill className="text-pink-700" />
            <AiFillHome />
            <FaTwitter className="text-blue-500" />
          </div>
          <div className="flex flex-col items-center sm:items-start">
            <h2 className="text-[1.3em] font-bold">Original Name</h2>
            <p className="text-blue-700">{SeriesDetails?.original_name}</p>
          </div>
          <div className="flex flex-col items-center sm:items-start">
            <h2 className="text-[1.3em] font-bold">Original Language</h2>
            <p className="text-blue-700 uppercase">
              {SeriesDetails?.original_language}
            </p>
          </div>
          <div className="flex flex-col items-center sm:items-start">
            <h2 className="text-[1.3em] font-bold">Status</h2>
            <p className="text-blue-700">{SeriesDetails?.status}</p>
          </div>
          <div className="flex flex-col items-center sm:items-start">
            <h2 className="text-[1.3em] font-bold">Type</h2>
            <p className="text-blue-700">{SeriesDetails?.type}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowSeries;