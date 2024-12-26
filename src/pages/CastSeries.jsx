import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPersonDetails } from "../redux/Slices/person";
import { useNavigate, useParams } from "react-router-dom";
import { getSeriesCast, getSeriesDetails } from "../redux/Slices/seriesDetails";
import Loader from "../components/loader/Loader";

const CastSeries = () => {
  const dispatch = useDispatch();
  //   const { PersonDetails } = useSelector((state) => state.person);
  const { SeriesDetails, loading, SeriesCast } = useSelector(
    (state) => state.seriesDetails
  );
  const Art = SeriesCast?.crew?.filter((p) => p.department == "Art");
  const Directing = SeriesCast?.crew?.filter(
    (p) => p.department == "Directing"
  );
  const Production = SeriesCast?.crew?.filter(
    (p) => p.department == "Production"
  );
  const Crew = SeriesCast?.crew?.filter((p) => p.department == "Crew");
  const Camera = SeriesCast?.crew?.filter((p) => p.department == "Camera");
  const navigate = useNavigate();

  const { SeriesId } = useParams();

  useEffect(() => {
    setTimeout(() => {
      dispatch(getPersonDetails(SeriesId));
      dispatch(getSeriesDetails(SeriesId));
      dispatch(getSeriesCast(SeriesId));
    }, 1000);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="w-full">
      <div className="bg-gray-900 w-full text-start ">
        <div className="h-48 flex items-center">
          <img
            src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${SeriesDetails?.poster_path}`}
            className="h-full p-4 rounded "
          />
          <div>
            <h1 className="flex gap-2 text-[1.3em]">
              {SeriesDetails?.name}{" "}
              <p className="text-gray-500">
                {SeriesDetails?.first_air_date?.slice(0, 4)}
              </p>
            </h1>
            <p
              className="text-gray-500 cursor-pointer"
              onClick={() => navigate(-1)}
            >
              Back To Main
            </p>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col sm:flex-row">
        <div className="sm:w-1/2 flex flex-col">
          <h1 className="text-[2em] mt-5">Cast</h1>
          <div className="mt-4 w-full">
            {SeriesCast?.cast?.map((p, i) => (
              <div
                key={i}
                onClick={() => navigate(`/person/${p.id}`)}
                className=" m-auto gap-2 cursor-pointer rounded text-start bg-gray-800 flex flex-co items-center mb-5 w-[70%]"
              >
                <img
                  className=""
                  src={
                    p.profile_path?.length == null
                      ? `https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg`
                      : `https://image.tmdb.org/t/p/w600_and_h900_bestv2${p?.profile_path}`
                  }
                  width={200}
                />
                <div className="flex flex-col ">
                  <h3 className="text-white text-[1.2em] mt-2">{p?.name}</h3>
                  <h3 className="text-gray-500">{p?.character}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="sm:w-1/2 flex flex-col">
          <h1 className="text-[2em] mt-5">Crew</h1>
          <div className="mt-4 w-full">
            <div className="mt-5 mb-5">
              <h1 className="text-[1.5em] mt-5 mb-5 text-blue-500 font-bold">
                Directing
              </h1>
              {Directing?.slice(0, 5)?.map((p, i) => (
                <div
                  key={i}
                  className=" m-auto gap-2  rounded text-start bg-gray-800 flex flex-co items-center mb-5 w-[70%] cursor-pointer"
                  onClick={() => navigate(`/person/${p.id}`)}
                >
                  <img
                    className=""
                    src={
                      p.profile_path?.length == null
                        ? `https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg`
                        : `https://image.tmdb.org/t/p/w600_and_h900_bestv2${p?.profile_path}`
                    }
                    width={200}
                  />
                  <div className="flex flex-col ">
                    <h3 className="text-white text-[1.2em] mt-2">{p?.name}</h3>
                    <h3 className="text-gray-500">{p?.known_for_department}</h3>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-5 mb-5">
              <h1 className="text-[1.5em] mt-5 mb-5 text-blue-500 font-bold">
                Production
              </h1>
              {Production?.slice(0, 5)?.map((p, i) => (
                <div
                  key={i}
                  className=" m-auto gap-2 cursor-pointer rounded text-start bg-gray-800 flex flex-co items-center mb-5 w-[70%]"
                  onClick={() => navigate(`/person/${p.id}`)}
                >
                  <img
                    className=""
                    src={
                      p.profile_path?.length == null
                        ? `https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg`
                        : `https://image.tmdb.org/t/p/w600_and_h900_bestv2${p?.profile_path}`
                    }
                    width={200}
                  />
                  <div className="flex flex-col ">
                    <h3 className="text-white text-[1.2em] mt-2">{p?.name}</h3>
                    <h3 className="text-gray-500">{p?.known_for_department}</h3>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-5 mb-5">
              <h1 className="text-[1.5em] mt-5 mb-5 text-blue-500 font-bold">
                Crew
              </h1>
              {Crew?.slice(0, 4)?.map((p, i) => (
                <div
                  key={i}
                  onClick={() => navigate(`/person/${p.id}`)}
                  className=" m-auto gap-2 cursor-pointer rounded text-start bg-gray-800 flex flex-co items-center mb-5 w-[70%]"
                >
                  <img
                    className=""
                    src={
                      p.profile_path?.length == null
                        ? `https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg`
                        : `https://image.tmdb.org/t/p/w600_and_h900_bestv2${p?.profile_path}`
                    }
                    width={200}
                  />
                  <div className="flex flex-col ">
                    <h3 className="text-white text-[1.2em] mt-2">{p?.name}</h3>
                    <h3 className="text-gray-500">{p?.known_for_department}</h3>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-5 mb-5">
              <h1 className="text-[1.5em] mt-5 mb-5 text-blue-500 font-bold">
                Art
              </h1>
              {Art?.slice(0, 2)?.map((p, i) => (
                <div
                  key={i}
                  onClick={() => navigate(`/person/${p.id}`)}
                  className=" m-auto gap-2 cursor-pointer rounded text-start bg-gray-800 flex flex-co items-center mb-5 w-[70%]"
                >
                  <img
                    className=""
                    src={
                      p.profile_path?.length == null
                        ? `https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg`
                        : `https://image.tmdb.org/t/p/w600_and_h900_bestv2${p?.profile_path}`
                    }
                    width={200}
                  />
                  <div className="flex flex-col ">
                    <h3 className="text-white text-[1.2em] mt-2">{p?.name}</h3>
                    <h3 className="text-gray-500">{p?.known_for_department}</h3>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-5 mb-5">
              <h1 className="text-[1.5em] mt-5 mb-5 text-blue-500 font-bold">
                Camera
              </h1>
              {Camera?.slice(0, 2)?.map((p, i) => (
                <div
                  key={i}
                  onClick={() => navigate(`/person/${p.id}`)}
                  className=" m-auto gap-2 cursor-pointer rounded text-start bg-gray-800 flex flex-co items-center mb-5 w-[70%]"
                >
                  <img
                    className=""
                    src={
                      p.profile_path?.length == null
                        ? `https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg`
                        : `https://image.tmdb.org/t/p/w600_and_h900_bestv2${p?.profile_path}`
                    }
                    width={200}
                  />
                  <div className="flex flex-col ">
                    <h3 className="text-white text-[1.2em] mt-2">{p?.name}</h3>
                    <h3 className="text-gray-500">{p?.known_for_department}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CastSeries;
