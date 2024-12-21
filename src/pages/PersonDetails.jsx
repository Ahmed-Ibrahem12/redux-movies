import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPersonDetails, getPersonRecommend } from "../redux/Slices/person";
import { useNavigate, useParams } from "react-router-dom";
import { FaFacebook, FaTwitter } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { AiFillHome } from "react-icons/ai";

const PersonDetails = () => {
  const { PersonDetails, PersonRecommend } = useSelector(
    (state) => state.personDetails
  );
  const dispatch = useDispatch();
  const { personId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getPersonDetails(personId));
    dispatch(getPersonRecommend(personId));
  }, []);

  return (
    <div className="w-full">
      <div className="w-full flex flex-col sm:flex-row">
        <div className="sm:w-[25%] flex flex-col p-4 ">
          <div className="p-4">
            <img
              src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${PersonDetails?.profile_path}`}
              className="rounded"
            />
          </div>
          <div className="flex justify-evenly items-center mt-5 mb-5 text-[1.5em] ">
            <FaFacebook className="text-blue-700" />
            <RiInstagramFill className="text-pink-600" />
            <AiFillHome />
            <FaTwitter className="text-blue-500" />
          </div>

          <div className="flex flex-col w-full sm:items-start">
            <h1 className="text-[1.4em] font-bold">Personal Info</h1>
            <div className="mt-3 flex flex-col sm:items-start">
              <h1 className="text-[1.2em] font-bold">Known For</h1>
              <p className="text-blue-700 font-bold mt-1">
                {PersonDetails?.known_for_department}
              </p>
            </div>
            <div className="mt-3 flex flex-col sm:items-start">
              <h1 className="text-[1.2em] font-bold">Gender</h1>
              <p className="text-blue-700 font-bold mt-1">
                {PersonDetails?.gender == 2 ? "Male" : "Female"}
              </p>
            </div>
            <div className="mt-3 flex flex-col sm:items-start">
              <h1 className="text-[1.2em] font-bold">Birthday</h1>
              <p className="text-blue-700 font-bold mt-1">
                {PersonDetails?.birthday}
              </p>
            </div>
            <div className="mt-3 flex flex-col sm:items-start">
              <h1 className="text-[1.2em] font-bold">Place of Birth</h1>
              <p className="text-blue-700 font-bold mt-1 text-[.9em]">
                {PersonDetails?.place_of_birth}
              </p>
            </div>
            <div className="mt-3 flex flex-col sm:items-start">
              <h1 className="text-[1.2em] font-bold">Also Known As</h1>
              <p className="text-blue-700 font-bold mt-1 flex flex-col sm:items-start">
                {PersonDetails?.also_known_as.map((p, i) => (
                  <span key={i} className="text-[.9em]">
                    {p}
                  </span>
                ))}
              </p>
            </div>
          </div>
        </div>
        <div className="sm:w-[75%] flex flex-col p-4 justify-between">
          <div className="flex flex-col sm:text-start">
            <h1 className="text-[1.5em] font-bold">{PersonDetails?.name}</h1>
            <p className="mt-5 text-blue-600 text-[1.4em]">Biography:</p>
            <p className="text-white text-[.9em]">{PersonDetails?.biography}</p>
          </div>
          <div className="flex flex-col mt-7 text-start">
            <div className="flex overflow-auto relative flex-nowrap w-full">
              {PersonRecommend?.cast.map((p, i) => (
                <div key={i} className="text-white">
                  <div
                    onClick={() => navigate(`/movies/${p.id}`)}
                    className="cursor-pointer block max-w-[18rem] ms-3 h-full w-44 rounded-lg bg-gray-800 text-surface shadow-secondary-1 dark:bg-surface-dark dark:text-white"
                  >
                    <div className="relative overflow-hidden bg-cover bg-no-repeat">
                      <img
                        className="rounded-t-lg"
                        src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${p.poster_path}`}
                      />
                    </div>
                    <div className="p-3 flex items-start justify-start flex-col">
                      <h3 className="text-[1.1em] font-bold">{p.title}</h3>
                      {/* <p className="text-base">{p.character}</p> */}
                    </div>
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

export default PersonDetails;
